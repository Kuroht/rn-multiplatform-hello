
import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { AppNavigator } from "shared";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppNavigator />
  </React.StrictMode>
);
