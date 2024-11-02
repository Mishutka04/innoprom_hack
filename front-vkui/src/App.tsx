import {
  Avatar,
  Card,
  Cell,
  Group,
  Panel,
  PanelHeader,
  Placeholder,
  SplitCol,
  SplitLayout,
  useAdaptivityConditionalRender,
  View,
} from "@vkontakte/vkui";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

import { EMPLOYEES_VIEW } from "./config/routes.ts";

export const App = () => {
  const { panel: activePanel = EMPLOYEES_VIEW.PANELS.EMPLOYEE_CARD } =
    useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();

  const { viewWidth } = useAdaptivityConditionalRender();
  const isVKCOM = false;

  return (
    <SplitLayout center header={!isVKCOM && <PanelHeader delimiter="none" />}>
      {viewWidth.tabletPlus && (
        <SplitCol
          className={viewWidth.tabletPlus.className}
          fixed
          width={280}
          maxWidth={280}
        >
          {!isVKCOM && <PanelHeader />}
          <Group>
            <Card>See placeholders on the right side.</Card>
          </Group>
          <Group>
            <Card>
              {["John", "Jane"].map((name) => (
                <Cell
                  key={name}
                  before={<Avatar size={48} />}
                  onClick={() => {
                    routeNavigator.push(
                      `/${EMPLOYEES_VIEW.PANELS.EMPLOYEE_CARD}/${name}`,
                    );
                  }}
                >
                  {name}
                </Cell>
              ))}
            </Card>
          </Group>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <View activePanel={activePanel}>
          <Panel id={EMPLOYEES_VIEW.PANELS.PLACEHOLDER}>
            <PanelHeader after={<Avatar size={36} />}>Panel 2</PanelHeader>
            <Group>
              <Placeholder>nothing here</Placeholder>
            </Group>
          </Panel>

          <Panel id={EMPLOYEES_VIEW.PANELS.EMPLOYEE_CARD}>
            <PanelHeader>Panel 3</PanelHeader>
            <Group>
              Hello John! <Avatar size={36} />
              <br />
              This is your user card 😉
            </Group>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
