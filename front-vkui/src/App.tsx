import { SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { DEFAULT_VIEW_PANELS } from "./config/routes.ts";
import { Home } from "./panels/Home.tsx";
import { Persik } from "./panels/Persik.tsx";
import { useAuthStore } from "./auth/stores/authStore.ts";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    // In real app, redirect to login page
    return (
      <div className="flex min-h-screen items-center justify-center">
        <button
          onClick={() => useAuthStore.getState().login("dummy", "dummy")}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Login (Dummy)
        </button>
      </div>
    );
  }
  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <Persik id="persik" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
