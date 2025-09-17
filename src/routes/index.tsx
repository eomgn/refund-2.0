import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";

export function IndexRoutes() {
  return (
    <>
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    </>
  );
}
