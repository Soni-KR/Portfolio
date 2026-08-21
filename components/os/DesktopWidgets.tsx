import Image from "next/image";
import pixelMourad from "@/public/pixel-mourad-v2.png";

type PixelMouradProps = {
  mood: "idle" | "working" | "excited";
  message: string | null;
};

export function StatusWidget() {
  return (
    <section className="desktop-widget status-widget" aria-label="Portfolio status">
      <header><span>STATUS.NODE</span><span className="status-led">ONLINE</span></header>
      <div className="status-readout">
        <span>PROFILE</span><strong>MOURAD KRAIEM</strong>
        <span>SPECIALTY</span><strong>AI / ML</strong>
        <span>AVAILABILITY</span><strong>FEB 2027</strong>
      </div>
      <p>Computer Science Engineering Student</p>
    </section>
  );
}

export function PixelMourad({ mood, message }: PixelMouradProps) {
  return (
    <section className={`pixel-companion pixel-companion-${mood}`} aria-label={`Pixel Mourad companion, ${mood}`}>
      {message && <p className="companion-bubble">{message}</p>}
      <div className="companion-screen">
        <Image
          src={pixelMourad}
          alt="Pixel-art portrait of Mourad Kraiem"
          className="companion-image"
          sizes="176px"
          priority={false}
        />
        <div className="companion-scanlines" aria-hidden="true" />
      </div>
      <footer><span>PIXEL_MK</span><span>{mood.toUpperCase()}</span></footer>
    </section>
  );
}
