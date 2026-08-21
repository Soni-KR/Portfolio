"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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

type AvatarPosition = { x: number; y: number };

const defaultAvatarPosition: AvatarPosition = { x: 54.8, y: 34 };
const avatarSize = { width: 8.5, height: 48 };

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
  const avatarDrag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    position: AvatarPosition;
  } | null>(null);
  const didDragAvatar = useRef(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [skyMode, setSkyMode] = useState<"night" | "dawn">("night");
  const [avatarPosition, setAvatarPosition] = useState(defaultAvatarPosition);
  const [avatarDragging, setAvatarDragging] = useState(false);

  useEffect(() => {
    const room = roomRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!room || !finePointer.matches || reducedMotion.matches) return;

    let animationFrame = 0;
    const moveRoom = (event: PointerEvent) => {
      if (room.dataset.avatarDragging === "true") return;
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

  const startAvatarDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (
      event.button !== 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      !roomRef.current
    ) {
      return;
    }

    avatarDrag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      position: avatarPosition,
    };
    didDragAvatar.current = false;
    roomRef.current.dataset.avatarDragging = "true";
    event.currentTarget.setPointerCapture(event.pointerId);
    setAvatarDragging(true);
  };

  const moveAvatar = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = avatarDrag.current;
    const room = roomRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !room) return;

    const roomBounds = room.getBoundingClientRect();
    const deltaX = ((event.clientX - drag.startX) / roomBounds.width) * 100;
    const deltaY = ((event.clientY - drag.startY) / roomBounds.height) * 100;
    if (Math.abs(deltaX) > 0.45 || Math.abs(deltaY) > 0.45) {
      didDragAvatar.current = true;
    }

    setAvatarPosition({
      x: Math.min(Math.max(drag.position.x + deltaX, 1), 99 - avatarSize.width),
      y: Math.min(Math.max(drag.position.y + deltaY, 2), 98 - avatarSize.height),
    });
  };

  const endAvatarDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (avatarDrag.current?.pointerId !== event.pointerId) return;
    avatarDrag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (roomRef.current) delete roomRef.current.dataset.avatarDragging;
    setAvatarDragging(false);
  };

  const openAboutFromAvatar = () => {
    if (didDragAvatar.current) {
      didDragAvatar.current = false;
      return;
    }
    onOpenApp("about");
  };

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
          src="/wallpaper/oskr-interests-room-v2.webp"
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
          <span>FOOTBALL//ML</span>
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
          className={`avatar-station room-hotspot hotspot-avatar ${avatarDragging ? "avatar-station-dragging" : ""}`}
          style={{ left: `${avatarPosition.x}%`, top: `${avatarPosition.y}%` }}
          data-hint={avatarDragging ? "MOVING MOURAD" : "DRAG // ABOUT MOURAD"}
          data-cursor={avatarDragging ? "Moving Mourad" : "Drag Mourad // Click for About"}
          aria-label="Drag Mourad, or select him to open About"
          onClick={openAboutFromAvatar}
          onPointerDown={startAvatarDrag}
          onPointerMove={moveAvatar}
          onPointerUp={endAvatarDrag}
          onPointerCancel={endAvatarDrag}
        >
          {message && <span className="lab-message">{message}</span>}
          <PixelMouradAvatar mood={mood} />
          <span className="avatar-nameplate">MOURAD.EXE // {mood.toUpperCase()}</span>
        </button>
      </div>

      <p className="scene-instructions">ROOM LINKS // 7 ACTIVE OBJECTS // DRAG MOURAD</p>
    </section>
  );
}
