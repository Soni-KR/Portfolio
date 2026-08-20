import {
  useEffect,
  useRef,
  useState,
  useId,
  type FormEvent,
} from "react";
import { achievements } from "@/data/achievements";
import { desktopApps, type AppId } from "@/data/desktopApps";
import { experience, profile, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";

type TerminalLine = {
  id: number;
  kind: "command" | "output" | "error";
  text: string;
};

type TerminalAppProps = {
  onOpenApp: (appId: AppId) => void;
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
  "achievements         list awards and leadership",
  "apps                 list graphical applications",
  "contact              print verified contact links",
  "open <app>           open a graphical application",
  "clear                erase terminal history",
];

export function TerminalApp({ onOpenApp }: TerminalAppProps) {
  const inputId = useId();
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState("");
  const nextLineId = useRef(initialLines.length + 1);
  const outputEnd = useRef<HTMLDivElement | null>(null);

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
            text: `${index + 1}. ${project.name} - ${project.category}`,
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
      case "research":
        output = experience.map((item) => ({
          kind: "output",
          text: `${item.period} // ${item.title} @ ${item.organization}`,
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
    runCommand(command);
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
          placeholder="help"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
