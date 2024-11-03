import { Employee } from "@/types/employee";
import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "../api/employeesApi";
import {
  Button,
  ButtonGroup,
  DisplayTitle,
  Div,
  Group,
  HorizontalScroll,
  Image,
  PanelHeaderBack,
  Placeholder,
  Separator,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";
import React from "react";
import { CardBodyText } from "@/features/employees/components/CardBodyText.tsx";
import { CardBodyMatrix } from "@/features/employees/components/CardBodyMatrix.tsx";
import baseTheme from "@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme";
import { useNavigate } from "react-router-dom";

interface EmployeeCardProps {
  employeeOrNull: Employee | undefined;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employeeOrNull,
}) => {
  return (
    <Group
      mode="card"
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {employeeOrNull ? (
        <FilledEmployeeCard employee={employeeOrNull} />
      ) : (
        <PlaceholderEmployeeCard />
      )}
    </Group>
  );
};

const PlaceholderEmployeeCard: React.FC = () => {
  return (
    <Placeholder
      icon={<Image src="src/assets/persik.png" size={96} noBorder />}
    >
      Сотрудник еще не выбран
    </Placeholder>
  );
};

const FilledEmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  const cardBody: "text" | "matrix" = "text";
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate(-1);
  };
  const { data: reports } = useQuery({
    queryKey: ["employeeReports", employee.id],
    queryFn: () => employeesApi.getEmployeeReports(employee.id),
  });
  const handleDownloadPdf = (pdfId: string) => {
    employeesApi.downloadPdf(pdfId);
    //todo: handle download
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <PanelHeaderBack
          style={{ color: baseTheme.colorIconAccent.normal.value }}
          onClick={() => handleCloseClick()}
        />
        <DisplayTitle level="3" weight="3">
          Иванов Иван
        </DisplayTitle>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <HorizontalScroll>
          <Tabs style={{ width: "100%" }}>
            <TabsItem onClick={() => {}} selected={true}>
              Текстовое представление
            </TabsItem>
            <TabsItem onClick={() => {}} selected={false}>
              Матрица компетенций
            </TabsItem>
          </Tabs>
        </HorizontalScroll>
      </div>

      {/* Card Body */}
      <div style={{ flex: 1, width: "100%" }}>
        <Div>
          {cardBody === "text" ? (
            <CardBodyText
              props={{
                name: "Иван Иванов",
                avatarSrc:
                  "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1", //TODO
              }}
            />
          ) : (
            <CardBodyMatrix props={{ aaa: "bbb" }} /> //TODO
          )}
        </Div>
      </div>

      {/* Bottom Buttons */}
      <Separator
        wide
        mode="primary"
        style={{
          width:
            "calc(100% + var(--vkui_internal--Group_card_mode_padding_size) * 2)",
        }}
      />
      <Div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "97%",
        }}
      >
        <ButtonGroup mode="horizontal" gap="s" style={{ width: "100%" }}>
          <Button onClick={() => {}} size="l" mode="secondary" stretched>
            Скачать PDF
          </Button>
          <Button onClick={() => {}} size="l" mode="secondary" stretched>
            Скачать SVG
          </Button>
        </ButtonGroup>
      </Div>
    </div>
  );
};
