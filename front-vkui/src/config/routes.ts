import {
  createBrowserRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const ROOT = "root";

export const EMPLOYEES_VIEW = {
  VIEW_ID: "employees_view",
  PANELS: {
    PLACEHOLDER: "placeholder_panel",
    EMPLOYEE_CARD: "employee_card",
  },
} as const;

export const PERSIK_VIEW = {
  VIEW_ID: "persik_view",
  PANELS: {
    MAIN: "main_panel",
  },
} as const;

export const routes = RoutesConfig.create([
  createRoot(ROOT, [
    createView(EMPLOYEES_VIEW.VIEW_ID, [
      createPanel(EMPLOYEES_VIEW.PANELS.PLACEHOLDER, "/", []),
      createPanel(EMPLOYEES_VIEW.PANELS.EMPLOYEE_CARD, "/employee_card", []),
    ]),
    createView(PERSIK_VIEW.VIEW_ID, [
      createPanel(PERSIK_VIEW.PANELS.MAIN, "/persik", []),
    ]),
  ]),
]);

export const router = createBrowserRouter(routes.getRoutes());
