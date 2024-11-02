import { FC } from "react";
import {
  Button,
  Div,
  Group,
  Header,
  NavIdProps,
  Panel,
  PanelHeader,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push("persik")}
          >
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
