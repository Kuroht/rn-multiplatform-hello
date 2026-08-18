# RN Multiplatform Hello World

An npm workspaces + Turborepo monorepo showing one shared React Native
component rendered by:

- **Expo** (`apps/mobile`) — iOS, Android, and Expo's own Web build
- **Electron** (`apps/desktop`) — Windows/Mac/Linux, using `react-native-web`
  in the renderer process to run the exact same component

```
apps/
  mobile/    Expo app (bare RN + expo-status-bar)
  desktop/   Electron app, Vite-bundled renderer, react-native-web aliasing
packages/
  shared/    <HelloWorld /> — plain RN primitives (View/Text/StyleSheet),
             imported unmodified by both apps
```

## Setup

```bash
npm install
```

Node 18+ recommended. Scaffolded and tested with Node 22 / npm 10.

npm workspaces hoist dependencies to a single root `node_modules` by
default, which plays nicely with Metro's resolver out of the box — no
extra hoisting config needed (this is one of the reasons npm was chosen
over pnpm here; see [Architecture notes](#architecture-notes-electron-vs-react-native-windows)
below for the rest of the reasoning).

## Run

**Mobile (Expo)** — opens the Expo dev tools; scan the QR with Expo Go,
or press `i` / `a` for simulators, `w` for Expo's own web build:

```bash
npm run dev:mobile
```

> **Expo Go version mismatch:** Expo Go's app-store build lags behind the
> latest SDK (it's been stuck on SDK 54 on both stores for a while, with
> no fixed timeline for catching up). If you see "Project is incompatible
> with this version of Expo Go," run `npx expo start` from `apps/mobile`
> and press `a` — the CLI will offer to sideload a matching Expo Go build
> to your device/emulator directly, bypassing the store. For anything
> beyond quick testing, a [development build](https://docs.expo.dev/develop/development-builds/introduction/)
> is the more durable fix, since it always matches your project's SDK.

**Desktop (Electron)** — starts Vite on `:5173` and launches Electron
pointed at it, with hot reload:

```bash
npm run dev:desktop
```

**Desktop production build:**

```bash
npm run build:desktop
```

Builds the Vite renderer then packages the app with `electron-builder`
(you'll likely want to add build targets/icons in `apps/desktop/package.json`
under a `"build"` key before shipping — see the electron-builder docs).

## How the sharing works

- `packages/shared` ships raw `.tsx` source, no build step — both Metro
  (Expo) and Vite (Electron) transpile it directly as part of their own
  bundling, using npm workspace symlinks (`shared: "*"` resolved via the
  root `"workspaces"` field).
- `apps/mobile/metro.config.js` widens Metro's `watchFolders` /
  `nodeModulesPaths` to the monorepo root so it can see `packages/shared`.
- `apps/desktop/vite.config.ts` aliases the `react-native` import to
  `react-native-web` (via `require.resolve`, to sidestep bare-specifier
  resolution edge cases in Rollup's alias plugin) and allows Vite's dev
  server to read files outside `apps/desktop` (`server.fs.allow`).

## Architecture notes: Electron vs. react-native-windows

Windows support could have been built two different ways. This project
picked Electron; here's the reasoning, so the tradeoff is documented
rather than just assumed.

**Option A — `react-native-windows`** (native Windows via Microsoft's RN fork)

- Would give a genuinely native Windows UI (UWP/WinAppSDK), compiled
  through C++/C#, rather than a web view — same rendering model as iOS/
  Android, just a different native backend.
- In practice: `react-native-windows` trails core RN releases by months,
  has no official Expo support (bare workflow only), and a meaningfully
  smaller ecosystem — third-party native modules (camera, maps, sensors,
  etc.) frequently lack a Windows implementation, which means writing
  native C++/C# modules yourself to fill gaps.
- The risk compounds with every dependency added: a project can be 80%
  done and then stall on one library with no Windows port.

**Option B — Electron, with `react-native-web` in the renderer** (what
this project uses)

- Electron is the most mature, most documented way to ship a desktop app
  on Windows — and gets Mac/Linux support for free later, which
  `react-native-windows` alone would not.
- UI code is still shared, not duplicated: the same `packages/shared`
  components render inside Electron's Chromium renderer via
  `react-native-web`, so this isn't "write it twice," it's "same
  components, different host runtime."
- Tradeoff: it's a Chromium + Node runtime under the hood, so the binary
  and memory footprint are heavier than a truly native app, and you get
  web-view UI rather than native Windows widgets. For most business/
  CRUD-style apps this doesn't matter in practice; it would matter if the
  app needs deep OS integration (native file dialogs beyond what Electron
  exposes, COM interop, custom native chrome, etc.).

**Why Electron won for this project:** the failure mode with
`react-native-windows` tends to be discovering a missing native module
late, after most of the app is built — a project-risk problem, not just
an inconvenience. Electron's downsides (bundle size, memory) are known
and fixed costs, not an unbounded risk. If a future requirement needs
genuinely native Windows UI, that's isolated to `apps/windows` as a new
target rather than a rewrite of the shared component layer — the
`packages/shared` components would need to stay free of Electron/DOM-
specific assumptions to make that swap viable later.

## Known gaps / next steps

- No `react-native-windows` target — see above. If deep native Windows
  integration becomes a real requirement, that'd be a new `apps/windows`
  package, not a replacement for the Electron one.
- Expo Router / React Navigation isn't wired up yet — decide on a shared
  navigation abstraction early, since it tends to leak into components
  once there's more than a hello-world screen. Note that Expo Router
  doesn't run inside Electron, so the Electron shell would need a
  separate router (React Navigation or React Router) sharing screens
  where possible.
- `electron-builder` config (icons, app id, targets) isn't filled in —
  add a `"build"` key to `apps/desktop/package.json` before shipping.
- No CI yet — worth adding a workflow that runs `tsc --noEmit` and a
  Vite build on push, since both are cheap correctness checks that would
  have caught the earlier `react-native-web` peer-dependency mismatch
  before install time.
