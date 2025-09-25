import logoSvg from "../../src/assets/logo.svg";
import logoutSvg from "../../src/assets/logout.svg";

import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { remove, session } = useAuth();

  return (
    <>
      <header className="w-full flex justify-between">
        <img src={logoSvg} alt="Logo" className="my-8" />
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-200">
            {`Olá, ${session?.user.name}`}
          </span>

          <img
            src={logoutSvg}
            alt="Ícone de Logout"
            className="my-8 cursor-pointer hover:opacity-75 transition ease-linear"
            onClick={remove}
          />
        </div>
      </header>
    </>
  );
}
