import { Employee } from "@/types/types.ts";
import { Div, Group, Headline } from "@vkontakte/vkui";
import React from "react";
import { EmployeeCell } from "@/features/employees/components/EmployeeCell.tsx";
import { useNavigate } from "react-router-dom";

interface EmployeeListProps {
  employees: Employee[] | undefined;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  const mode = "default";
  const navigate = useNavigate();

  const handleUserClick = (employeeId: string) => {
    navigate(`/?employeeId=${employeeId}`);
  };

  const employeesByDepartment = employees?.reduce<Record<string, Employee[]>>(
    (acc, employee) => {
      const department = employee.department || "Other";
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(employee);
      return acc;
    },
    {},
  );

  return (
    <Group>
      {employeesByDepartment &&
        Object.entries(employeesByDepartment).map(
          ([department, departmentEmployees]) => (
            <React.Fragment key={department}>
              <Div>
                <Headline level="2" weight="1">
                  {department}
                </Headline>
              </Div>
              {departmentEmployees.map((employee) => (
                <EmployeeCell
                  key={employee.id}
                  avatarSrc={employee.imageUrl}
                  mode={mode}
                  name={employee.name}
                  rating={employee.rating}
                  position={employee.position}
                  onClick={() => handleUserClick(employee.id)}
                />
              ))}
            </React.Fragment>
          ),
        )}
    </Group>
  );
};
