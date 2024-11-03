import { Avatar, Cell, Headline } from "@vkontakte/vkui";
import { Icon16Chevron } from "@vkontakte/icons";
import baseTheme from "@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme";

interface Props {
  name: string;
  position: string;
  avatarSrc: string;
  rating: number;
  mode: "selectable" | "default";
  onClick: () => void;
}

export const EmployeeCell = ({
  name,
  position,
  avatarSrc,
  rating,
  onClick,
  mode,
}: Props) => {
  return (
    <Cell
      mode={mode === "default" ? undefined : mode}
      before={<Avatar src={avatarSrc} />}
      after={<Icon16Chevron />}
      onClick={onClick}
      style={{ display: "flex", flexDirection: "row", width: "100%" }}
    >
      {/*<div>*/}
      {/*  <Headline level="1" style={{ marginBottom: 2 }}>*/}
      {/*    {position}*/}
      {/*  </Headline>*/}
      {/*  <Footnote style={{ color: baseTheme.colorTextSecondary.normal.value }}>*/}
      {/*    Footnote*/}
      {/*  </Footnote>*/}
      {/*</div>*/}
      <Headline
        level="1"
        style={{ color: baseTheme.colorTextSecondary.normal.value }}
      >
        4.7
      </Headline>
    </Cell>
  );
};
