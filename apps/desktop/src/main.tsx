import "./global.css";
import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HelloWorld, MainLayout, Settings } from "shared";

type Page = "Home" | "Settings";

function App() {
  const [page, setPage] = useState<Page>("Home");

  return (
    <SafeAreaProvider>
      <MainLayout
        activeNavItem={page}
        onNavItemPress={(item) => setPage(item as Page)}
      >
        {page === "Home" ? <HelloWorld /> : <Settings />}
      </MainLayout>
    </SafeAreaProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);