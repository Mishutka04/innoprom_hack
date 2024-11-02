import "@vkontakte/vkui/dist/vkui.css";
import EmployeesPage from "@/features/employees/pages/EmployeesPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Panel,
  PanelHeader,
  useAppearance,
  View,
} from "@vkontakte/vkui";

const queryClient = new QueryClient();

export const AppConfig = () => {
  const appearance = useAppearance() || undefined;

  return (
    <ConfigProvider appearance={appearance} hasCustomPanelHeaderAfter={true}>
      <AdaptivityProvider>
        <AppRoot mode="full">
          <View activePanel="main_panel">
            <Panel id="main_panel">
              <PanelHeader>Title here</PanelHeader>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                  <Routes>
                    <Route path={"/"} element={<EmployeesPage />} />
                  </Routes>
                </BrowserRouter>
              </QueryClientProvider>
            </Panel>
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
