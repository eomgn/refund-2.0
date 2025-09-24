import { AuthProvider } from "./contexts/AuthContext";

import { IndexRoutes } from "./routes";

export function App() {
  return (
    <>
      <AuthProvider>
        <IndexRoutes />
      </AuthProvider>
    </>
  );
}
