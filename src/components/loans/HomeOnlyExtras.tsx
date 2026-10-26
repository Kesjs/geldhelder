"use client";
import { usePathname } from "next/navigation";
import { ConfidenceStrip } from "./ConfidenceStrip";
import { MediaRail } from "./MediaRail";
import { FaqSection } from "./FaqSection";
export function HomeOnlyExtras(){const pathname=usePathname();if(pathname!=="/")return null;return <><ConfidenceStrip/><MediaRail/><FaqSection/></>}
