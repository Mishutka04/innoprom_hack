import { create } from "zustand";
import { Employee } from "@/types/employee";

interface EmployeesState {
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
  filterText: string;
  setFilterText: (text: string) => void;
  departmentFilter: string | null;
  setDepartmentFilter: (department: string | null) => void;
}

export const useEmployeesStore = create<EmployeesState>((set) => ({
  selectedEmployee: null,
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),

  filterText: "",
  setFilterText: (text) => set({ filterText: text }),

  departmentFilter: null,
  setDepartmentFilter: (department) => set({ departmentFilter: department }),
}));
