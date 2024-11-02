import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import { router } from "./config/routes.ts";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>,
);
