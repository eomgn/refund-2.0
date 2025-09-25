import { useState } from "react";
import { useNavigate } from "react-router";

import { api } from "../services/api";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

const signUpSchema = z
  .object({
    name: z.string().trim().min(3, { error: "Informa o nome." }),
    email: z.email({ error: "E-mail inválido" }),
    password: z
      .string()
      .trim()
      .min(6, { error: "Senha deve ter pelo menos 6 caracteres." }),
    confirmPassword: z.string({ error: "Confirme a senha." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = signUpSchema.parse({
        name,
        email,
        password,
        confirmPassword,
      });

      // ############## COM AXIOS ##############
      await api.post("/users", data);

      // ############## COM FETCH ##############
      // await fetch("http://localhost:3333/users", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      if (confirm("Cadastro realizado com sucesso. Ir para tela inicial?")) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.issues.password._errors[0]);
      }

      return alert("Não foi possível cadastrar.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="Name"
        placeholder="Seu nome"
        onChange={(e) => setName(e.target.value)}
      />

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

      <Input
        type="password"
        required
        legend="Confirme a senha"
        placeholder="123456"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>

      <a
        href="/"
        className="text-sm mt-10 mb-4 font-semibold text-center text-gray-100 hover:text-green-700 transition ease-linear"
      >
        Já tenho uma conta
      </a>
    </form>
  );
}
