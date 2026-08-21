"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { AppId } from "@/data/desktopApps";

type CompanionMood = "idle" | "working" | "excited";

type WorkspaceWallpaperProps = {
  mood: CompanionMood;
  message: string | null;
  onOpenApp: (appId: AppId) => void;
};

const avatarSources: Record<CompanionMood, string> = {
  idle: "/avatar/mourad-idle.webp",
  working: "/avatar/mourad-working.webp",
  excited: "/avatar/mourad-excited.webp",
};

function PixelMouradAvatar({ mood }: { mood: CompanionMood }) {
  return (
    <span className={`lab-avatar lab-avatar-${mood}`}>
      {Object.entries(avatarSources).map(([state, source]) => (
        <Image
          key={state}
          src={source}
          alt=""
          width={360}
          height={720}
          sizes="(max-width: 639px) 72px, 130px"
          className={`avatar-pose ${state === mood ? "avatar-pose-active" : ""}`}
          priority={state === "idle"}
        />
      ))}
      <span className="avatar-spark avatar-spark-one" />
      <span className="avatar-spark avatar-spark-two" />
    </span>
  );
}

export function WorkspaceWallpaper({ mood, message, onOpenApp }: WorkspaceWallpaperProps) {
  const roomRef = useRef<HTMLElement>(null);
  const [lightsOn, setLightsOn] = useState(true);
  const [skyMode, setSkyMode] = useState<"night" | "dawn">("night");

  useEffect(() => {
    const room = roomRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!room || !finePointer.matches || reducedMotion.matches) return;

    let animationFrame = 0;
    const moveRoom = (event: PointerEvent) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        room.style.setProperty("--scene-x", `${x * 11}px`);
        room.style.setProperty("--scene-y", `${y * 8}px`);
        room.style.setProperty("--pointer-x", `${event.clientX}px`);
        room.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", moveRoom, { passive: true });
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", moveRoom);
    };
  }, []);

  const open = (appId: AppId) => () => onOpenApp(appId);

  return (
    <section
      ref={roomRef}
      className={`workspace-wallpaper workspace-wallpaper-${mood} workspace-wallpaper-${skyMode} ${
        lightsOn ? "workspace-wallpaper-lights-on" : "workspace-wallpaper-lights-off"
      }`}
      aria-label="Interactive OperatingSoni-KR engineering room"
    >
      <div className="lab-room-canvas">
        <Image
          src="/wallpaper/oskr-interactive-room.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="lab-room-art"
        />

        <span className="room-screen-glow room-screen-glow-laptop" aria-hidden="true" />
        <span className="room-screen-glow room-screen-glow-terminal" aria-hidden="true" />
        <span className="room-window-stars" aria-hidden="true" />
        <span className="scene-particle scene-particle-one" aria-hidden="true" />
        <span className="scene-particle scene-particle-two" aria-hidden="true" />
        <span className="scene-particle scene-particle-three" aria-hidden="true" />

        <div className="room-theme-rail" aria-hidden="true">
          <span>TUN//01</span>
          <span>AI/ML</span>
          <span>GRAPH-RAG</span>
          <span>RETRO//GAME</span>
          <span>ANIME//TECH</span>
        </div>

        <button
          type="button"
          className="room-hotspot hotspot-research"
          data-hint="RESEARCH"
          aria-label="Open Research from the investigation board"
          onClick={open("research")}
        />
        <button
          type="button"
          className="room-hotspot hotspot-window"
          data-hint={skyMode === "night" ? "DAWN MODE" : "NIGHT MODE"}
          aria-label={skyMode === "night" ? "Switch the room window to dawn" : "Switch the room window to night"}
          aria-pressed={skyMode === "dawn"}
          onClick={() => setSkyMode((current) => (current === "night" ? "dawn" : "night"))}
        />
        <button
          type="button"
          className="room-hotspot hotspot-achievements"
          data-hint="ACHIEVEMENTS"
          aria-label="Open Achievements from the server and medal stack"
          onClick={open("achievements")}
        />
        <button
          type="button"
          className="room-hotspot hotspot-resume"
          data-hint="RESUME"
          aria-label="Open Resume from the engineering notebook"
          onClick={open("resume")}
        />
        <button
          type="button"
          className="room-hotspot hotspot-projects"
          data-hint="PROJECTS"
          aria-label="Open Projects from the central laptop"
          onClick={open("projects")}
        />
        <button
          type="button"
          className="room-hotspot hotspot-terminal"
          data-hint="TERMINAL"
          aria-label="Open Terminal from the small terminal screen"
          onClick={open("terminal")}
        />
        <button
          type="button"
          className="room-hotspot hotspot-contact"
          data-hint="CONTACT"
          aria-label="Open Contact from the communications radio"
          onClick={open("contact")}
        />

        <button
          type="button"
          className="room-power"
          aria-label={lightsOn ? "Dim the engineering room" : "Power the engineering room"}
          aria-pressed={lightsOn}
          onClick={() => setLightsOn((current) => !current)}
        >
          <span aria-hidden="true">PWR</span>
        </button>

        <button
          type="button"
          className="avatar-station room-hotspot hotspot-avatar"
          data-hint="ABOUT MOURAD"
          aria-label="Open About by selecting Mourad"
          onClick={open("about")}
        >
          {message && <span className="lab-message">{message}</span>}
          <PixelMouradAvatar mood={mood} />
          <span className="avatar-nameplate">MOURAD.EXE // {mood.toUpperCase()}</span>
        </button>
      </div>

      <p className="scene-instructions">ROOM LINKS // 7 ACTIVE OBJECTS</p>
    </section>
  );
}
