import { Employee, EmployeeReport } from "@/types/employee";

// Dummy data
const dummyEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    position: "Senior Developer",
    department: "Engineering",
    email: "john.doe@company.com",
    managerId: "2",
    imageUrl:
      "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Engineering Manager",
    department: "Engineering",
    email: "jane.smith@company.com",
    managerId: null,
    imageUrl:
      "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
  },
  {
    id: "3",
    name: "Bob Johnson",
    position: "Designer",
    department: "Design",
    email: "bob.johnson@company.com",
    managerId: "2",
    imageUrl:
      "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
  },
  {
    id: "4",
    name: "Ann Smith",
    position: "Designer",
    department: "Design",
    email: "ann.smith@company.com",
    managerId: "2",
    imageUrl:
      "https://sun9-70.userapi.com/c636327/v636327034/2be84/TYzZpZ8BL0k.jpg?ava=1",
  },
];

const dummyReports: Record<string, EmployeeReport[]> = {
  "1": [
    {
      id: "r1",
      employeeId: "1",
      period: "2024-Q1",
      performance: "excellent",
      goals: ["Complete project X", "Mentor junior developers"],
      feedback: "Excellent performance this quarter",
      createdAt: "2024-03-31",
    },
  ],
};

export const employeesApi = {
  getAccessibleEmployees: async (userId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
    return dummyEmployees;
  },

  getEmployeeReports: async (employeeId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return dummyReports[employeeId] || [];
  },

  downloadPdf: async (reportId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Downloading report:", reportId);
    // In real app, this would trigger file download
  },
};
