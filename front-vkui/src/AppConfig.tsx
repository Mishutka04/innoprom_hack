import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  useAppearance,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { App } from "./App";

export const AppConfig = () => {
  const appearance = useAppearance() || undefined;
  // const { viewWidth } = useAdaptivityConditionalRender();

  return (
    <ConfigProvider appearance={appearance} hasCustomPanelHeaderAfter={true}>
      <AdaptivityProvider>
        <AppRoot mode="full">
          {/*Add routes*/}
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
