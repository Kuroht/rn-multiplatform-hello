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