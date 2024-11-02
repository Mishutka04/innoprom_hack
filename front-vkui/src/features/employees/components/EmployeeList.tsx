import { Employee } from "@/types/employee";
import { Cell, Group } from "@vkontakte/vkui";
import React from "react";

interface EmployeeListProps {
  employees: Employee[] | undefined;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <Group>
      {employees?.map((employee) => (
        <Cell key={employee.id}>{employee.name}</Cell>
      ))}
    </Group>
  );
};
