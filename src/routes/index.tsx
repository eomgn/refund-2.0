import { BrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";

import { Loading } from "../components/Loading";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";

const isLoading = false;

export function IndexRoutes() {
  const { session } = useAuth();

  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />;

      case "manager":
        return <ManagerRoutes />;

      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    </>
  );
}
