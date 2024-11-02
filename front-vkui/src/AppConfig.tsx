import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  useAppearance,
} from "@vkontakte/vkui";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import "@vkontakte/vkui/dist/vkui.css";

import { App } from "./App";
import { router } from "./config/routes.ts";

export const AppConfig = () => {
  const appearance = useAppearance() || undefined;
  // const { viewWidth } = useAdaptivityConditionalRender();

  return (
    <ConfigProvider appearance={appearance} hasCustomPanelHeaderAfter={true}>
      <AdaptivityProvider>
        <AppRoot mode="full">
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
