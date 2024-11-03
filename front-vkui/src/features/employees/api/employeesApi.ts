import { Employee, EmployeeReport, Skill } from "@/types/types.ts"; // Dummy data

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

const dummySkills: Record<string, Skill[]> = {
  "1": [
    {
      name: "Командная работа",
      rating: 5,
      description:
        "Командная работа" +
        "Всегда готов прийти на помощь своему другу Петю. Он отлично умеет" +
        " делиться игрушками и не ругается, когда кто-то берет его машинку на время. " +
        "Вместе они строят невероятные горки из кубиков и при этом никогда не ссорятся, " +
        "что делает занятия в группе настоящим праздником.",
    },
    {
      name: "Творческие способности",
      rating: 4,
      description:
        "Всегда рисует яркие рисунки на занятиях и не забывает рассказывать всем " +
        "смешные истории о своих персонажах. Ни одно утро в детском саду не обходится без его " +
        "удивительных сказок о приключениях лисички и зайца.",
    },
    {
      name: "Самостоятельность",
      rating: 3,
      description:
        "Миша умеет сам одеваться и завязывать шнурки без посторонней помощи — прямо как настоящий взрослый! " +
        "Кроме того, он отлично справляется с задачами и всегда помнит, где находится его рюкзак. " +
        "Его организованность вызывает восхищение даже у воспитателей!",
    },
  ],
};

const dummyReports: Record<string, EmployeeReport[]> = {
  "1": [
    {
      id: "r1",
      employeeId: "1",
      rating: 4.1,
      description:
        "Звезда нашего детского сада. Он всегда улыбается и готов порадовать окружающих своим обаянием! " +
        "Его позитивный настрой и дружелюбие делают группу более сплоченной. " +
        "Любит участвовать в играх, а его стремление к обучению вдохновляет не только сверстников, " +
        "но и воспитателей. Мы уверены, что с такими качествами он в будущем станет настоящим лидером!",
      reviewers: dummyEmployees,
      skills: dummySkills["1"],
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
