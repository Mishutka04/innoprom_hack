import { Employee } from "@/types/employee";
import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "../api/employeesApi";
import { Card, Group, Placeholder } from "@vkontakte/vkui";
import React from "react";

interface EmployeeCardProps {
  employeeOrNull: Employee | undefined;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employeeOrNull,
}) => {
  return (
    <Group>
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
    <Card>
      <Placeholder>Select employee first</Placeholder>
    </Card>
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

  return <Card>Hello, I am employee named {employee.name}</Card>;
};
