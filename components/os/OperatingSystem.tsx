"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { BootScreen } from "@/components/os/BootScreen";

const Desktop = dynamic(() =>
  import("@/components/os/Desktop").then((module) => module.Desktop),
);

type SystemPhase = "boot" | "desktop";

export function OperatingSystem() {
  const [phase, setPhase] = useState<SystemPhase>("boot");

  if (phase === "boot") {
    return <BootScreen onComplete={() => setPhase("desktop")} />;
  }

  return <Desktop />;
}
