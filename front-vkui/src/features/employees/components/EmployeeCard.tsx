import { Employee } from "@/types/employee";
import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "../api/employeesApi";
import { Div, Group, Image, Placeholder } from "@vkontakte/vkui";
import React from "react";

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
    <Div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Image src="src/assets/persik.png" size={96} noBorder />
      <Placeholder>Сотрудник еще не выбран</Placeholder>
    </Div>
  );
};

const FilledEmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  const { data: reports } = useQuery({
    queryKey: ["employeeReports", employee.id],
    queryFn: () => employeesApi.getEmployeeReports(employee.id),
  });

  const handleDownload = (reportId: string) => {
    employeesApi.downloadReport(reportId);
  };

  return <Div>Hello, I am employee named {employee.name}</Div>;
};
