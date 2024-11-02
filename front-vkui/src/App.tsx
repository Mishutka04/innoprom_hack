import { SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { EMPLOYEES_VIEW } from "./config/routes.ts";
import { Home } from "./panels/Home.tsx";
import { Persik } from "./panels/Persik.tsx";
import { useAuthStore } from "./auth/stores/authStore.ts";

export const App = () => {
  const { panel: activePanel = EMPLOYEES_VIEW.PANELS.PLACEHOLDER } =
    useActiveVkuiLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id={EMPLOYEES_VIEW.PANELS.PLACEHOLDER} />
          <Persik id={EMPLOYEES_VIEW.PANELS.EMPLOYEE_CARD} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
