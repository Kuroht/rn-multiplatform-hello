import "./global.css";
import { StatusBar } from "expo-status-bar";
import { HelloWorld } from "shared";

export default function App() {
  return (
    <>
      <HelloWorld />
      <StatusBar style="light" />
    </>
  );
}