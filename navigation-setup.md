# Add Cross-Platform Navigation

## Summary

Add typed stack navigation that works in both the Expo mobile app and the Electron desktop renderer while keeping screens reusable from `packages/shared`.

## Implementation

### Dependencies

Install the JavaScript stack navigator in both consuming applications from the repository root. Use `@react-navigation/stack` instead of `@react-navigation/native-stack` because the desktop app runs through `react-native-web`:

```powershell
npm install @react-navigation/native @react-navigation/stack --workspace mobile
npm install @react-navigation/native @react-navigation/stack --workspace desktop
```

If Expo needs compatible versions of the native support packages, run this from `apps/mobile`:

```powershell
cd apps/mobile
npx expo install react-native-screens react-native-safe-area-context
cd ../..
```

### Shared route types

Keep the route contract in `packages/shared/src/navigation/routes.ts`:

```tsx
export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};
```

Export the route type from `packages/shared/src/index.ts`:

```tsx
export { HelloWorld } from "./screens/HelloWorld";
export type { RootStackParamList } from "./navigation/routes";
```

### Mobile navigation

Update `apps/mobile/App.tsx`. The navigator belongs in this app entry point, not in `routes.ts`:

```tsx
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HelloWorld } from "shared";
import type { RootStackParamList } from "shared";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HelloWorld} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="light" />
    </>
  );
}
```

### Desktop navigation

Update `apps/desktop/src/main.tsx` around the renderer root:

```tsx
import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HelloWorld } from "shared";
import type { RootStackParamList } from "shared";

const Stack = createStackNavigator<RootStackParamList>();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HelloWorld} />
      </Stack.Navigator>
    </NavigationContainer>
  </React.StrictMode>,
);
```

The shared screens remain platform-independent and are reused by Electron through `react-native-web`.

### Linking

When multiple screens are available, add a linking configuration in each app entry point. Keep it outside `routes.ts` because mobile and Electron may eventually need different URL prefixes:

```tsx
const linking = {
  config: {
    screens: {
      Home: "",
      Settings: "settings",
    },
  },
};
```

Pass it to the container with:

```tsx
<NavigationContainer linking={linking}>
```

## Acceptance Criteria

- Mobile starts with `HelloWorld` displayed as the `Home` route.
- Desktop starts with the same `Home` route and shared screen.
- Route names and parameters are type-safe.
- `RootStackParamList` is exported from `packages/shared/src/index.ts`.
- Both app packages declare their React Navigation dependencies.
- A future `Settings` screen can be added without changing the navigation architecture.
- Shared screens do not depend on Electron or DOM-specific APIs.
- Mobile and desktop builds complete successfully.
