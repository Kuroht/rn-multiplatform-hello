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