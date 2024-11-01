import { EmployeesPage } from "@/features/employees/pages/EmployeesPage";

export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  requiredRole?: "employee" | "manager" | "hr";
}

export const routes: RouteConfig[] = [
  {
    path: "/employees",
    element: EmployeesPage,
    requiredRole: "employee", // Minimum required role
  },
  // Other routes will be added later:
  // {
  //   path: '/reviews',
  //   element: ReviewsPage,
  //   requiredRole: 'manager'
  // },
  // {
  //   path: '/api-keys',
  //   element: ApiKeysPage,
  //   requiredRole: 'hr'
  // }
];
