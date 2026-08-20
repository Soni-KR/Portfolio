"use client";

import { useCallback, useState } from "react";
import { BootScreen } from "@/components/os/BootScreen";
import { Desktop } from "@/components/os/Desktop";
import { WelcomeScreen } from "@/components/os/WelcomeScreen";

type SystemPhase = "boot" | "welcome" | "desktop";

export function OperatingSystem() {
  const [phase, setPhase] = useState<SystemPhase>("boot");

  const showWelcomeScreen = useCallback(() => {
    setPhase("welcome");
  }, []);

  if (phase === "boot") {
    return <BootScreen onComplete={showWelcomeScreen} />;
  }

  if (phase === "welcome") {
    return <WelcomeScreen onEnter={() => setPhase("desktop")} />;
  }

  return <Desktop />;
}
