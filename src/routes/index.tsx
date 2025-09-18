import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";

export function IndexRoutes() {
  return (
    <>
      <BrowserRouter>
        {/* <AuthRoutes /> */}
        <EmployeeRoutes />
      </BrowserRouter>
    </>
  );
}
