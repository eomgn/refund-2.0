import { useActionState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

const signSchema = z.object({
  email: z.email({ error: "E-mail inválido." }),
  password: z
    .string()
    .trim()
    .min(6, { error: "Senha deve ter pelo menos 6 caracteres." }),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, {
    email: "",
    password: "",
  });

  async function signIn(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = signSchema.parse({
        email,
        password,
      });

      const response = await api.post("/sessions", data);

      console.log(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
    }

    return { email, password };
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        type="email"
        required
        legend="E-mail"
        placeholder="seu@email.com"
      />

      <Input
        name="password"
        type="password"
        required
        legend="Senha"
        placeholder="123456"
      />

      <span className="text-sm text-red-600 text-center my-4 font-medium">
        {state.message}
      </span>

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
