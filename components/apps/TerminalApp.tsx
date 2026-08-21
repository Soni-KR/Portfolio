import {
  useEffect,
  useRef,
  useState,
  useId,
  type FormEvent,
} from "react";
import { achievements } from "@/data/achievements";
import { desktopApps, type AppId } from "@/data/desktopApps";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { skillGroups } from "@/data/skills";

type TerminalLine = {
  id: number;
  kind: "command" | "output" | "error";
  text: string;
};

type TerminalAppProps = {
  onOpenApp: (appId: AppId) => void;
  onResetDesktop: () => void;
};

const initialLines: TerminalLine[] = [
  {
    id: 1,
    kind: "output",
    text: "OperatingSoni-KR terminal protocol v1.0",
  },
  {
    id: 2,
    kind: "output",
    text: "Type 'help' to inspect available commands.",
  },
];

const commandHelp = [
  "help                 list available commands",
  "whoami               identify the portfolio owner",
  "about                print profile summary",
  "projects             list selected projects",
  "skills               list technical skills",
  "experience           list research internships",
  "research             list research internships",
  "resume               open the interactive resume",
  "education            list education records",
  "achievements         list awards and leadership",
  "apps                 list graphical applications",
  "contact              print verified contact links",
  "github               print the GitHub profile",
  "open <app>           open a graphical application",
  "reset desktop       restore desktop item positions",
  "clear                erase terminal history",
];

export function TerminalApp({ onOpenApp, onResetDesktop }: TerminalAppProps) {
  const inputId = useId();
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState("");
  const nextLineId = useRef(initialLines.length + 1);
  const outputEnd = useRef<HTMLDivElement | null>(null);
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef(0);

  useEffect(() => {
    outputEnd.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const appendLines = (
    newLines: Array<Omit<TerminalLine, "id">>,
  ) => {
    setLines((currentLines) => [
      ...currentLines,
      ...newLines.map((line) => ({
        ...line,
        id: nextLineId.current++,
      })),
    ]);
  };

  const runCommand = (rawCommand: string) => {
    const [command, ...argumentsList] = rawCommand.toLowerCase().split(/\s+/);

    if (command === "clear") {
      setLines([]);
      return;
    }

    const commandLine: Omit<TerminalLine, "id"> = {
      kind: "command",
      text: `guest@operatingsoni:~$ ${rawCommand}`,
    };
    let output: Array<Omit<TerminalLine, "id">>;

    switch (command) {
      case "help":
        output = commandHelp.map((text) => ({ kind: "output", text }));
        break;

      case "whoami":
        output = [
          { kind: "output", text: profile.name },
          { kind: "output", text: profile.role },
          { kind: "output", text: profile.location },
        ];
        break;

      case "about":
        output = [
          { kind: "output", text: profile.summary },
          { kind: "output", text: profile.availability },
          { kind: "output", text: "Hint: run 'open about' for the full app." },
        ];
        break;

      case "projects":
        output = [
          ...projects.map((project, index) => ({
            kind: "output" as const,
            text: `${index + 1}. ${project.name} - ${project.domains.join(" / ")}`,
          })),
          {
            kind: "output",
            text: "Hint: run 'open projects' for project details.",
          },
        ];
        break;

      case "skills":
        output = skillGroups.map((group) => ({
          kind: "output",
          text: `${group.label}: ${group.items.join(", ")}`,
        }));
        break;

      case "experience":
        output = experience.map((item) => ({
          kind: "output",
          text: `${item.period} // ${item.title} @ ${item.organization}`,
        }));
        break;

      case "research":
        output = research.map((item) => ({
          kind: "output",
          text: `${item.status} // ${item.title}`,
        }));
        break;

      case "resume":
        onOpenApp("resume");
        output = [{ kind: "output", text: "Launching interactive resume..." }];
        break;

      case "education":
        output = education.map((item) => ({
          kind: "output",
          text: `${item.period} // ${item.degree} @ ${item.institution}`,
        }));
        break;

      case "achievements":
        output = achievements.map((achievement) => ({
          kind: "output",
          text: `${achievement.title}${achievement.metric ? ` // ${achievement.metric}` : ""}`,
        }));
        break;

      case "apps":
        output = desktopApps.map((app) => ({
          kind: "output",
          text: `${app.id.padEnd(14)} ${app.label} application`,
        }));
        break;

      case "contact":
        output = [
          { kind: "output", text: "Email: mourad.kraiem@ensi-uma.tn" },
          { kind: "output", text: `LinkedIn: ${profile.links.linkedin}` },
          { kind: "output", text: `GitHub: ${profile.links.github}` },
        ];
        break;

      case "github":
        output = [{ kind: "output", text: profile.links.github }];
        break;

      case "open": {
        const requestedApp = argumentsList[0];
        const app = desktopApps.find((item) => item.id === requestedApp);

        if (app) {
          onOpenApp(app.id);
          output = [
            {
              kind: "output",
              text: `Launching ${requestedApp} application...`,
            },
          ];
        } else {
          output = [
            {
              kind: "error",
              text: `Usage: open <${desktopApps.map((item) => item.id).join("|")}>`,
            },
          ];
        }
        break;
      }

      case "reset":
        if (argumentsList[0] === "desktop") {
          onResetDesktop();
          output = [{ kind: "output", text: "Desktop layout restored to system defaults." }];
        } else {
          output = [{ kind: "error", text: "Usage: reset desktop" }];
        }
        break;

      case "soni":
        output = [
          { kind: "output", text: "Momentum protocol armed. Keep moving forward." },
          { kind: "output", text: "No borrowed sprites were found in this system." },
        ];
        break;

      case "sanji":
        output = [{ kind: "output", text: "Kitchen process online. Precision, timing, no wasted motion." }];
        break;

      case "inter":
        output = [{ kind: "output", text: "Black and blue signal detected. Forza Inter." }];
        break;

      case "stand":
        output = [{ kind: "output", text: "Stand process invisible. System effect: dramatic confidence +100." }];
        break;

      case "peni":
        output = [{ kind: "output", text: "Mech-pilot affinity registered. No proprietary assets mounted." }];
        break;

      case "":
        return;

      default:
        output = [
          {
            kind: "error",
            text: `Command not found: ${command}. Run 'help'.`,
          },
        ];
    }

    appendLines([commandLine, ...output]);
  };

  const submitCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim();

    if (!command) {
      return;
    }

    setInput("");
    if (commandHistory.current.at(-1) !== command) {
      commandHistory.current.push(command);
    }
    historyIndex.current = commandHistory.current.length;
    runCommand(command);
  };

  const navigateHistory = (direction: "older" | "newer") => {
    if (commandHistory.current.length === 0) return;
    historyIndex.current = Math.min(
      commandHistory.current.length,
      Math.max(0, historyIndex.current + (direction === "older" ? -1 : 1)),
    );
    setInput(commandHistory.current[historyIndex.current] ?? "");
  };

  return (
    <div className="flex h-full min-h-64 flex-col font-mono text-xs sm:text-sm">
      <div
        className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-2"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((line) => (
          <p
            key={line.id}
            className={`whitespace-pre-wrap leading-6 ${
              line.kind === "command"
                ? "mt-3 text-fuchsia-200"
                : line.kind === "error"
                  ? "text-rose-300"
                  : "text-cyan-100/70"
            }`}
          >
            {line.text}
          </p>
        ))}
        <div ref={outputEnd} />
      </div>

      <form
        className="mt-4 flex items-center gap-2 border-t border-cyan-300/20 pt-3"
        onSubmit={submitCommand}
      >
        <label className="shrink-0 text-lime-300" htmlFor={inputId}>
          guest@oskr:~$
        </label>
        <input
          id={inputId}
          className="min-w-0 flex-1 bg-transparent text-cyan-50 caret-fuchsia-300 outline-none placeholder:text-cyan-100/25"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              navigateHistory("older");
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              navigateHistory("newer");
            }
          }}
          placeholder="help"
          aria-label="Terminal command"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
