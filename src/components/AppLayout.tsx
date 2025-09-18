import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center bg-gray-400 text-gray-100">
        <main className="p-3 w-full md:w-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
