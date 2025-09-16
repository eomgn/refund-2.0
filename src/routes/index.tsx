import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./auth-routes";

export function IndexRoutes() {
  return (
    <>
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    </>
  );
}
