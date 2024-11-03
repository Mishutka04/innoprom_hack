export type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  managerId: string | null;
  imageUrl: string;
  rating: number;
};

export type Skill = {
  name: string;
  rating: number;
  description: string;
};

export type EmployeeReport = {
  id: string;
  employeeId: string;
  description: string;
  reviewers: Employee[];
  skills: Skill[];
};

export type UserRole = "employee" | "manager" | "hr";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  employeeId: string;
}
