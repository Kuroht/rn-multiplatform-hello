import React from "react";
import { createRoot } from "react-dom/client";
import { HelloWorld } from "shared";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
);
