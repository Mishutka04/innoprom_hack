import { Employee } from "@/types/types.ts";
import { Group, Image, Placeholder } from "@vkontakte/vkui";
import React from "react";
import { EmployeeCard } from "@/features/employees/components/EmployeeCard.tsx";

interface EmployeeCardProps {
  employeeOrNull: Employee | undefined;
}

export const EmployeeCardLayout: React.FC<EmployeeCardProps> = ({
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
        <EmployeeCard employee={employeeOrNull} />
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
