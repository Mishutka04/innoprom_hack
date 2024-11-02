import React from "react";
import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "../api/employeesApi";
import { useAuthStore } from "@/auth/stores/authStore";

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
    <div>Some stuff here</div>
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Employee Reports</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    //     {employees && <EmployeeList employees={employees} />}
    //   </CardContent>
    // </Card>
  );
};
