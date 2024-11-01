import React from "react";
import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "../api/employeesApi";
import { useAuthStore } from "@/auth/stores/authStore";
import { EmployeeList } from "../components/EmployeeList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const EmployeesPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees", user?.id],
    queryFn: () => employeesApi.getAccessibleEmployees(user?.id || ""),
    enabled: !!user,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Reports</CardTitle>
      </CardHeader>
      <CardContent>
        {employees && <EmployeeList employees={employees} />}
      </CardContent>
    </Card>
  );
};
