import baseTheme from "@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme";

import {
  Avatar,
  Card,
  CardGrid,
  Div,
  Header,
  Headline,
  Paragraph,
  Separator,
  Spacing,
  Title,
  UsersStack,
} from "@vkontakte/vkui";
import { Icon16StarAlt } from "@vkontakte/icons";

interface Props {
  avatarSrc: string;
  name: string;
  // TODO other
}

export const CardBodyText = ({
  props: { avatarSrc, name },
}: {
  props: Props;
}) => {
  return (
    <>
      {/* Employee info header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar size={56} src={avatarSrc} />
        <Div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Title level="1">Иванов Вася</Title>
          <Title
            level="3"
            weight="3"
            style={{ color: baseTheme.colorTextSubhead.normal.value }}
          >
            Middle back-end developer
          </Title>
        </Div>
        <Header
          mode="secondary"
          afterTitle={
            <Icon16StarAlt
              fill={baseTheme.colorBackgroundAccent.normal.value}
            />
          }
          style={{ padding: 0, alignSelf: "flex-start" }}
        >
          4.7
        </Header>
      </div>

      {/* Text summary */}
      <Card>
        <Div>
          <Headline level="1" style={{ marginBottom: 2 }} weight={"1"}>
            Краткое описание
          </Headline>
          <Paragraph>
            Звезда нашего детского сада. Он всегда улыбается и готов порадовать
            окружающих своим обаянием! Его позитивный настрой и дружелюбие
            делают группу более сплоченной. Вася любит участвовать в играх, а
            его стремление к обучению вдохновляет не только сверстников, но и
            воспитателей. Мы уверены, что с такими качествами он в будущем
            станет настоящим лидером!
          </Paragraph>
        </Div>
      </Card>
      <Spacing size={4} />

      {/* Reviewers */}
      <Div style={{ display: "flex", flexDirection: "row" }}>
        <UsersStack
          photos={[
            "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
            "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
            "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
            "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
            "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
            "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
            "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
            "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
          ]}
          size="l"
          direction="row"
        >
          Оценка на основе 8 отзывов
        </UsersStack>
      </Div>

      <Spacing size={8} />
      <Separator style={{ width: "100%" }} />
      <Spacing size={8} />

      {/* Skill Cards */}
      <CardGrid size="l">
        {[
          {
            skill: "Командная работа",
            stars: 4,
            description:
              "Всегда готов прийти на помощь своему другу Пете. " +
              "Он отлично умеет делиться игрушками и не ругается, когда кто-то берет его машинку на время. В" +
              "месте они строят невероятные горки из кубиков и при этом никогда не ссорятся, что " +
              "делает занятия в группе настоящим праздником.",
          },
          {
            skill: "Творческие навыки",
            stars: 4,
            description:
              "Он всегда рисует яркие рисунки на занятиях и не забывает рассказывать всем " +
              "смешные истории о своих персонажах. Ни одно утро в детском саду не " +
              "обходится без удивительных сказок о приключениях лисички и зайца.",
          },
          {
            skill: "Управляемость",
            stars: 4,
            description:
              "Очень хорошо делает задачи с коллегами и руководителями, " +
              "всегда готов помочь и поддержать. Слушает маму и папу, " +
              "кушает кашу, не разговаривает с незнакомыми дядями на улицах.",
          },
        ].map((x) => {
          return (
            <Card mode="outline">
              <Div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Headline level="1" weight={"1"} style={{ marginBottom: 2 }}>
                    {x.skill}
                  </Headline>
                  <div>rating here</div>
                </div>
                <Paragraph>{x.description}</Paragraph>
              </Div>
            </Card>
          );
        })}
      </CardGrid>
    </>
  );
};
