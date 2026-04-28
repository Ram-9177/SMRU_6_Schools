import type { Metadata } from "next";
import { getStaticRouteConfig } from "@/lib/shared/route-registry";

const route = getStaticRouteConfig("campus360");

export const metadata: Metadata = route.metadata;

export default route.View;
