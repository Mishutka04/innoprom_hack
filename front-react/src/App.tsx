import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./auth/stores/authStore";
import { PageLayout } from "@/components/layout/PageLayout.tsx";
import { EmployeesPage } from "@/features/employees/pages/EmployeesPage.tsx";

const queryClient = new QueryClient();

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    // In real app, redirect to login page
    return (
      <div className="flex min-h-screen items-center justify-center">
        <button
          onClick={() => useAuthStore.getState().login("dummy", "dummy")}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Login (Dummy)
        </button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <PageLayout>
          <Routes>
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/" element={<Navigate to="/employees" replace />} />
          </Routes>
        </PageLayout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
