import React, { useState } from "react";
import { Employee, EmployeeReport } from "@/types/types.ts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "@/features/employees/api/employeesApi.ts";
import {
  Button,
  ButtonGroup,
  DisplayTitle,
  Div,
  HorizontalScroll,
  PanelHeaderBack,
  Separator,
  Spinner,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";
import baseTheme from "@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme";
import { EmployeeCardBodyMatrix } from "@/features/employees/components/EmployeeCardBodyMatrix.tsx";
import { EmployeeCardBodyText } from "@/features/employees/components/EmployeeCardBodyText.tsx";

export const EmployeeCard: React.FC<{ employee: Employee }> = ({
  employee,
}) => {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/");
  };
  const { data: reportsOrNull, isFetchedAfterMount } = useQuery({
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
      {isFetchedAfterMount && reportsOrNull?.[0] ? (
        <CardLoadedContent report={reportsOrNull[0]} employee={employee} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const CardLoadedContent: React.FC<{
  employee: Employee;
  report: EmployeeReport;
}> = ({ report, employee }) => {
  const [cardBody, setCardBody] = useState<"text" | "matrix">("text");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <HorizontalScroll>
          <Tabs style={{ width: "100%" }}>
            <TabsItem
              onClick={() => setCardBody("text")}
              selected={cardBody === "text"}
            >
              Текстовое представление
            </TabsItem>
            <TabsItem
              onClick={() => setCardBody("matrix")}
              selected={cardBody === "matrix"}
            >
              Матрица компетенций
            </TabsItem>
          </Tabs>
        </HorizontalScroll>
      </div>

      {/* Card Body */}
      <div style={{ flex: 1, width: "100%" }}>
        <Div>
          {cardBody === "text" ? (
            <EmployeeCardBodyText employee={employee} report={report} />
          ) : (
            <EmployeeCardBodyMatrix props={{ aaa: "bbb" }} /> //TODO
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
    </>
  );
};
