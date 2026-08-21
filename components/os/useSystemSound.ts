import { useCallback } from "react";

export type SystemSound = "open" | "focus" | "reset" | "toggle";

export function useSystemSound(enabled: boolean) {
  return useCallback(
    (sound: SystemSound) => {
      if (!enabled) return;

      const AudioContextConstructor = window.AudioContext;
      const context = new AudioContextConstructor();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const frequencies: Record<SystemSound, number> = {
        open: 520,
        focus: 360,
        reset: 240,
        toggle: 440,
      };

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(frequencies[sound], context.currentTime);
      gain.gain.setValueAtTime(0.025, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.07);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.07);
      oscillator.addEventListener("ended", () => void context.close(), { once: true });
    },
    [enabled],
  );
}
