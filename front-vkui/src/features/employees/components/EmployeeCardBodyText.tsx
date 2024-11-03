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
import StarRating from "@/features/employees/components/StarRating.tsx";
import { Employee, Skill } from "@/types/employee.ts";

interface Props {
  avatarSrc: string;
  name: string;
  position: string;
  rating: number;
  description: string;
  reviewers: Employee[];
  skills: Skill[];
}

export const EmployeeCardBodyText = ({
  avatarSrc,
  name,
  position,
  rating,
  description,
  reviewers,
  skills,
}: Props) => {
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
          <Title level="1">{name}</Title>
          <Title
            level="3"
            weight="3"
            style={{ color: baseTheme.colorTextSubhead.normal.value }}
          >
            {position}
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
          {rating}
        </Header>
      </div>

      {/* Text summary */}
      <Card>
        <Div>
          <Headline level="1" style={{ marginBottom: 2 }} weight="1">
            Краткое описание
          </Headline>
          <Paragraph>{description}</Paragraph>
        </Div>
      </Card>
      <Spacing size={4} />

      {/* Reviewers */}
      <Div style={{ display: "flex", flexDirection: "row" }}>
        <UsersStack
          photos={reviewers.map((r) => r.imageUrl)}
          size="l"
          direction="row"
        >
          {`Оценка на основе ${reviewers.length} отзывов`}
        </UsersStack>
      </Div>

      <Spacing size={8} />
      <Separator mode="secondary" style={{ width: "100%" }} />
      <Spacing size={16} />

      {/* Skill Cards */}
      <CardGrid size="l">
        {skills.map((skill) => (
          <Card mode="outline" key={skill.name}>
            <Div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Headline level="1" weight="1" style={{ marginBottom: 2 }}>
                  {skill.name}
                </Headline>
                <StarRating rating={skill.rating} />
              </div>
              <Paragraph>{skill.description}</Paragraph>
            </Div>
          </Card>
        ))}
      </CardGrid>
    </>
  );
};
