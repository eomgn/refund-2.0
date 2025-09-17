import { useState } from "react";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    alert(`E-mail: ${email} & Senha: ${password}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        type="email"
        required
        legend="E-mail"
        placeholder="seu@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        required
        legend="Senha"
        placeholder="123456"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a
        href="/signup"
        className="text-sm mt-10 mb-4 font-semibold text-center text-gray-100 hover:text-green-700 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
