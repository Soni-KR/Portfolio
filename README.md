# OperatingSoni-KR

OperatingSoni-KR is Mourad Kraiem's personal AI and machine-learning portfolio, presented as an original fictional operating system rather than a conventional scrolling website.

Visitors enter through a short boot sequence and arrive at a desktop where portfolio sections behave like applications. Windows can be focused, moved, resized, minimized, maximized, restored from the taskbar, and persisted locally.

## Experience

- Full-screen retro AI-lab wallpaper with seven interactive objects, parallax, lighting, and day/night states
- Photo-derived Mourad companion with distinct idle, working, and excited poses
- Double-click desktop navigation on computers and single-tap navigation on touch devices
- Draggable desktop icons and status widget with versioned local persistence
- Projects explorer with folders, complete project index, and detailed records
- Research archive, interactive resume, profile, achievements, contact, and terminal apps
- `Ctrl/Cmd + K` command palette with keyboard navigation and record-level search
- Optional synthesized system sounds, muted by default
- Responsive mobile window mode and reduced-motion support
- Open Graph sharing card, web-app manifest, crawler metadata, and generated app icons

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Native React state and reducers
- Web Audio API for optional system tones
- CSS animation and interaction layers for the wallpaper, icons, and custom contextual cursor
- Optimized WebP illustration and avatar assets

No Python runtime is required. If a future maintenance script needs Python, use a project-local `.venv` rather than the system interpreter.

## Local setup

Requirements:

- Node.js compatible with Next.js 16
- npm

Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Project structure

```text
app/
  layout.tsx          Metadata, fonts, social sharing, and root layout
  page.tsx            Operating-system entry point
  globals.css         Visual system, responsive rules, wallpaper, and animation
  icon.tsx            Generated browser icon
  apple-icon.tsx      Generated mobile icon
  manifest.ts         Installable web-app metadata
  robots.ts           Search crawler rules

components/
  apps/               Portfolio application interfaces
  os/                 Desktop, windows, taskbar, launcher, wallpaper, and OS state

data/                 Canonical portfolio content
public/               Optimized wallpaper, avatar poses, social card, and resume PDF
```

## Architecture

The operating system and portfolio content are intentionally separate.

`Window.tsx` handles operating-system behavior such as movement, sizing, focus, minimizing, maximizing, and closing. It does not know about individual projects or research records.

`AppContent.tsx` maps application identifiers to lazily loaded application components. `Desktop.tsx` coordinates window state, launch targets, desktop layout, sounds, search, and mascot reactions.

Portfolio records live in `data/`, allowing content updates without changing window mechanics or the desktop shell.

## Updating portfolio content

- Profile and verified links: `data/profile.ts`
- Education: `data/education.ts`
- Experience: `data/experience.ts`
- Projects and project folders: `data/projects.ts`
- Research records: `data/research.ts`
- Skills: `data/skills.ts`
- Achievements: `data/achievements.ts`
- Hidden future certifications: `data/certifications.ts`

Resume updates should replace `public/resume.pdf` while keeping the same filename unless `ResumeApp.tsx` is updated too.

## Customizing the OS

- Desktop applications and default window sizes: `data/desktopApps.ts`
- Default icon/widget positions: `components/os/desktopLayoutStorage.ts`
- Window behavior: `components/os/windowReducer.ts` and `components/os/Window.tsx`
- Animated, interactive wallpaper and mascot behavior: `components/os/WorkspaceWallpaper.tsx`
- Identity-based avatar poses: `public/avatar/`
- Cohesive illustrated room backdrop: `public/wallpaper/oskr-interactive-room.webp`
- Wallpaper, mascot, cursor, and responsive styling: `app/globals.css`
- Terminal commands and easter eggs: `components/apps/TerminalApp.tsx`

The room is an interactive navigation layer. The investigation board opens Research; the server and medal stack opens Achievements; the notebook opens Resume; the central laptop opens Projects; the small screen opens Terminal; the radio opens Contact; and Mourad opens About. The window changes the time of day, while the power control dims or restores the room. Fine pointers also drive subtle scene parallax and a moving ambient light.

The mascot uses three optimized transparent WebP poses derived from Mourad's portrait. Idle, working, and excited states switch instantly and total roughly 65 KB.

## Environment

Copy `.env.example` to `.env.local` and set the final production origin before deployment:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

This value is used to produce absolute canonical and social-sharing URLs. Do not publish with the localhost fallback.

## Accessibility and responsive behavior

- Visible keyboard focus styles
- Focus containment and restoration in the command palette
- Arrow-key command palette navigation
- Keyboard-accessible window resizing
- Focus transfer when an application opens or restores
- Screen-reader announcements for terminal output, search results, and mascot messages
- Reduced-motion handling for the boot sequence and animations
- Desktop double-click with a touch-specific single-tap fallback

The maintained manual QA targets are:

- 390px mobile
- 768px tablet
- 1366×768 laptop
- 1920×1080 desktop

## Deployment handoff

Deployment is intentionally provider-neutral and handled separately. Before publishing:

1. Set the real `NEXT_PUBLIC_SITE_URL`.
2. Run the complete production checks.
3. Add a sitemap using the approved production domain.
4. Verify the Open Graph card from the public HTTPS origin.
5. Re-run the four responsive QA targets.

Do not commit secrets or a personal `.env.local` file.
