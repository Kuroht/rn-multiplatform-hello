import "./global.css";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "shared";

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="light" />
    </>
  );
}