import type { Metadata } from "next";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";

const route = getStaticRouteConfig("qtst");

export const metadata: Metadata = route.metadata;

export default route.View;
