import React from "react";
import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "../api/employeesApi";
import { useAuthStore } from "@/auth/stores/authStore";
import { useLocation } from "react-router-dom";
import {
  SplitCol,
  SplitLayout,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import { EmployeeList } from "@/features/employees/components/EmployeeList.tsx";
import { EmployeeCard } from "@/features/employees/components/EmployeeCard.tsx";

const EmployeesPage = () => {
  const { viewWidth } = useAdaptivityConditionalRender();
  const user = useAuthStore((state) => {
    state.login("xxx", "xxx");
    return state.user;
  });
  const { data: employeesOrNull, isLoading } = useQuery({
    queryKey: ["employees", user?.id],
    queryFn: () => employeesApi.getAccessibleEmployees(user?.id || ""),
    enabled: !!user,
  });
  const queryParams = new URLSearchParams(useLocation().search);
  const employeeId = queryParams.get("employeeId");
  const focusedEmployeeOrNull = employeesOrNull?.find(
    (e) => e.id === employeeId,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SplitLayout center>
      {viewWidth.tabletMinus && (
        <SplitCol
          width="100%"
          maxWidth="560px"
          stretchedOnMobile
          autoSpaced
          className={viewWidth.tabletMinus.className}
        >
          {!employeeId ? (
            <EmployeeList employees={employeesOrNull} />
          ) : (
            <EmployeeCard employeeOrNull={focusedEmployeeOrNull} />
          )}
        </SplitCol>
      )}

      {viewWidth.tabletPlus && (
        <>
          <SplitCol
            width={280}
            maxWidth={280}
            className={viewWidth.tabletPlus.className}
          >
            <EmployeeList employees={employeesOrNull} />
          </SplitCol>
          <SplitCol
            width="100%"
            maxWidth="560px"
            stretchedOnMobile
            autoSpaced
            className={viewWidth.tabletPlus.className}
          >
            <EmployeeCard employeeOrNull={focusedEmployeeOrNull} />
          </SplitCol>
        </>
      )}
    </SplitLayout>
  );
};

export default EmployeesPage;
