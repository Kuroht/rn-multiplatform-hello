# RN Multiplatform Hello World

A pnpm + Turborepo monorepo showing one shared React Native component
rendered by:

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
pnpm install
```

Node 18+ recommended. This was scaffolded and tested with Node 22 / pnpm 11.

> Note: `.npmrc` sets `node-linker=hoisted`. React Native's Metro bundler
> resolves node_modules in ways that don't always play nicely with pnpm's
> default strict symlinked structure, so hoisting avoids a class of
> "module not found" issues. This is the standard recommendation for
> RN + pnpm monorepos.

## Run

**Mobile (Expo)** — opens the Expo dev tools; scan the QR with Expo Go,
or press `i` / `a` for simulators, `w` for Expo's own web build:

```bash
pnpm dev:mobile
```

**Desktop (Electron)** — starts Vite on :5173 and launches Electron
pointed at it, with hot reload:

```bash
pnpm dev:desktop
```

**Desktop production build:**

```bash
pnpm build:desktop
```

Builds the Vite renderer then packages the app with `electron-builder`
(you'll likely want to add build targets/icons in `apps/desktop/package.json`
under an `"build"` key before shipping — see the electron-builder docs).

## How the sharing works

- `packages/shared` ships raw `.tsx` source, no build step — both Metro
  (Expo) and Vite (Electron) transpile it directly as part of their own
  bundling, using workspace symlinks (`shared: "workspace:*"`).
- `apps/mobile/metro.config.js` widens Metro's `watchFolders` /
  `nodeModulesPaths` to the monorepo root so it can see `packages/shared`
  and hoisted dependencies.
- `apps/desktop/vite.config.ts` aliases the `react-native` import to
  `react-native-web` (via `require.resolve`, to sidestep bare-specifier
  resolution edge cases in Rollup's alias plugin) and allows Vite's dev
  server to read files outside `apps/desktop` (`server.fs.allow`).

## Known gaps / next steps

- No `react-native-windows` here — Windows is served by Electron instead
  (see the tradeoffs discussion in chat). If you later need genuinely
  native Windows UI, that'd be a separate `apps/windows` target.
- Expo Router / React Navigation isn't wired up yet — decide on a shared
  navigation abstraction early, since it tends to leak into components
  once you have more than a hello-world screen.
- `electron-builder` config (icons, app id, targets) isn't filled in —
  add a `"build"` key to `apps/desktop/package.json` before shipping.
"# rn-multiplatform-hello" 
