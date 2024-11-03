export type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  managerId: string | null;
  imageUrl: string;
};

export type EmployeeReport = {
  id: string;
  employeeId: string;
  period: string;
  performance: "excellent" | "good" | "average" | "poor";
  goals: string[];
  feedback: string;
  createdAt: string;
};

export type UserRole = "employee" | "manager" | "hr";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  employeeId: string;
}
