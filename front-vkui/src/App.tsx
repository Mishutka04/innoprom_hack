import {
  Avatar,
  Button,
  Card,
  Cell,
  Group,
  PanelHeader,
  Placeholder,
  SplitCol,
  SplitLayout,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import { useState } from "react";

export const App = () => {
  const { viewWidth } = useAdaptivityConditionalRender();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
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
            <Card>
              See placeholders on the right side
              <Button onClick={() => setShowPlaceholder(!showPlaceholder)}>
                Toggle
              </Button>
            </Card>
          </Group>
          <Group>
            <Card>
              {["John", "Jane"].map((name) => (
                <Cell
                  key={name}
                  before={<Avatar size={48} />}
                  onClick={() => {
                    console.log("clicked on", name);
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
        {showPlaceholder && (
          <Group>
            <Placeholder>nothing here</Placeholder>
          </Group>
        )}
        {!showPlaceholder && (
          <Group>
            Hello John! <Avatar size={36} />
            <br />
            This is your user card 😉
          </Group>
        )}
      </SplitCol>
    </SplitLayout>
  );
};
