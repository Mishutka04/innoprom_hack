import React from "react";
import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "../api/employeesApi";
import { useAuthStore } from "@/auth/stores/authStore";
import { useLocation } from "react-router-dom";
import {
  Spinner,
  SplitCol,
  SplitLayout,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";
import { EmployeeList } from "@/features/employees/components/EmployeeList.tsx";
import { EmployeeCardLayout } from "@/features/employees/components/EmployeeCardLayout.tsx";

const EmployeesPage = () => {
  const { viewWidth } = useAdaptivityConditionalRender();
  const user = useAuthStore((state) => state.user);
  const { data: employeesOrNull, isFetchedAfterMount } = useQuery({
    queryKey: ["employees", user?.id],
    queryFn: () => employeesApi.getAccessibleEmployees(user?.id || ""),
    enabled: !!user,
  });
  const queryParams = new URLSearchParams(useLocation().search);
  const employeeId = queryParams.get("employeeId");
  const focusedEmployeeOrNull = employeesOrNull?.find(
    (e) => e.id === employeeId,
  );

  if (!isFetchedAfterMount) {
    return <Spinner />;
  }

  return (
    <SplitLayout center>
      {viewWidth.tabletMinus && (
        <SplitCol
          width="100%"
          maxWidth="560px"
          stretchedOnMobile
          autoSpaced
          style={{ height: "90%" }}
          className={viewWidth.tabletMinus.className}
        >
          {!employeeId ? (
            <EmployeeList employees={employeesOrNull} />
          ) : (
            <EmployeeCardLayout employeeOrNull={focusedEmployeeOrNull} />
          )}
        </SplitCol>
      )}

      {viewWidth.tabletPlus && (
        <>
          <SplitCol
            maxWidth={"30vw"}
            className={viewWidth.tabletPlus.className}
            style={{
              height: "80%",
              marginLeft:
                "var(--vkui--size_split_col_padding_horizontal--regular)",
            }}
          >
            <EmployeeList employees={employeesOrNull} />
          </SplitCol>
          <SplitCol
            stretchedOnMobile
            autoSpaced
            style={{ height: "80%" }}
            className={viewWidth.tabletPlus.className}
          >
            <EmployeeCardLayout employeeOrNull={focusedEmployeeOrNull} />
          </SplitCol>
        </>
      )}
    </SplitLayout>
  );
};

export default EmployeesPage;
