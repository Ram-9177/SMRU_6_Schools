"use client";

import { startTransition, useCallback, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";

type ToTarget =
  | string
  | {
      pathname?: string;
      search?: string;
      hash?: string;
    };

type NavigationStore = {
  isNavigating: boolean;
  startedAt: number;
};

const navigationStore: NavigationStore = {
  isNavigating: false,
  startedAt: 0,
};
const listeners = new Set<(state: NavigationStore) => void>();

const emitNavigationState = () => {
  listeners.forEach((listener) => listener({ ...navigationStore }));
};

const shouldSkipTransition = (to: string) => {
  return (
    !to ||
    to.startsWith("#") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:") ||
    /^https?:\/\//i.test(to)
  );
};

export const startNavigationTransition = () => {
  if (navigationStore.isNavigating) return;
  navigationStore.isNavigating = true;
  navigationStore.startedAt = Date.now();
  emitNavigationState();
};

export const completeNavigationTransition = () => {
  if (!navigationStore.isNavigating) return;

  navigationStore.isNavigating = false;
  navigationStore.startedAt = 0;
  emitNavigationState();
};

// Store scroll positions for page restoration (module-scoped so it survives across hooks)
const scrollPositions = new Map<string, number>();

export const saveScrollPosition = (pathname: string) => {
  if (typeof window === "undefined") return;
  scrollPositions.set(pathname, window.scrollY || 0);
};

export const restoreScrollPosition = (pathname: string, fallbackToTop = false) => {
  if (typeof window === "undefined") return;
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    const savedPosition = scrollPositions.get(pathname);
    if (savedPosition !== undefined) {
      window.scrollTo(0, savedPosition);
    } else if (fallbackToTop) {
      window.scrollTo(0, 0);
    }
  });
};

export function useNavigationTransition() {
  const [state, setState] = useState<NavigationStore>({ ...navigationStore });

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return state;
}

// Handle back/forward and hash navigations globally so saved positions are restored
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    // small timeout to allow Next.js to render target route
    setTimeout(() => {
      if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "auto" });
          // ensure instant jump then smooth behaviour resumes
        } else {
          restoreScrollPosition(path, true);
        }
      } else {
        restoreScrollPosition(path, true);
      }
    }, 0);
  });

  // When hash changes without full navigation, scroll to anchor immediately
  window.addEventListener("hashchange", () => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "auto" });
  });
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: ToTarget;
  replace?: boolean;
  children: ReactNode;
};

const normalizeTo = (to: ToTarget) => {
  if (typeof to === "string") return to;

  const pathname = to?.pathname || "/";
  const search = to?.search ? (to.search.startsWith("?") ? to.search : `?${to.search}`) : "";
  const hash = to?.hash ? (to.hash.startsWith("#") ? to.hash : `#${to.hash}`) : "";

  return `${pathname}${search}${hash}`;
};

export function Link({ to, children, replace, ...rest }: LinkProps) {
  const pathname = usePathname();
  const targetHref = normalizeTo(to);

  const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] = (event) => {
    rest.onClick?.(event);

    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if ((rest.target || "").toLowerCase() === "_blank") return;
    if (shouldSkipTransition(targetHref)) return;
    if (targetHref === pathname) return;

    // Save scroll position before navigation
    saveScrollPosition(pathname);
    startNavigationTransition();
  };

  return (
    <NextLink href={targetHref} replace={replace} prefetch scroll={false} onClick={handleClick} {...rest}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (to: ToTarget, options?: { replace?: boolean }) => {
      const targetHref = normalizeTo(to);

      if (!shouldSkipTransition(targetHref)) {
          saveScrollPosition(pathname);
        startNavigationTransition();
      }

      startTransition(() => {
        if (options?.replace) {
          router.replace(targetHref, { scroll: false });
        } else {
          router.push(targetHref, { scroll: false });
        }
      });
    },
    [router, pathname]
  );
}

export function useParams<TParams extends Record<string, string>>() {
  return useNextParams() as TParams;
}

export function useLocation() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const syncLocationBits = () => {
      setHash(window.location.hash || "");
      setSearch(window.location.search || "");
    };
    syncLocationBits();
    window.addEventListener("hashchange", syncLocationBits);
    window.addEventListener("popstate", syncLocationBits);
    return () => {
      window.removeEventListener("hashchange", syncLocationBits);
      window.removeEventListener("popstate", syncLocationBits);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearch(window.location.search || "");
    }
  }, [pathname]);

  return {
    pathname,
    hash,
    search,
  };
}

export function Navigate({ to, replace = false }: { to: string; replace?: boolean }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null;
}
