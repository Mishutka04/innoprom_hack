import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Panel,
  PanelHeader,
  useAppearance,
  View,
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
          <View activePanel="main_panel">
            <Panel id="main_panel">
              <PanelHeader>Title here</PanelHeader>
              <App />
            </Panel>
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
