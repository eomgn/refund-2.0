import { Outlet } from "react-router";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-400 text-gray-100">
      <main className="p-3 w-full md:w-auto">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
