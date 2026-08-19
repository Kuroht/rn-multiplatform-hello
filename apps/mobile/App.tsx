import "./global.css";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HelloWorld, MainLayout, Settings } from "shared";

type Page = "Home" | "Settings";

export default function App() {
  const [page, setPage] = useState<Page>("Home");

  return (
    <SafeAreaProvider>
      <MainLayout
        activeNavItem={page}
        onNavItemPress={(item) => setPage(item as Page)}
      >
        {page === "Home" ? <HelloWorld /> : <Settings />}
      </MainLayout>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}