import { Routes, Route } from "react-router";

import { Refund } from "../pages/Refund";
import { NotFound } from "../pages/NotFound";

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/refund" element={<Refund />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
