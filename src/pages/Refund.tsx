import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";

import fileSvg from "../assets/file.svg";

import { api } from "../services/api";

import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/Categories";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";

const refundSchema = z.object({
  name: z.string().min(3, { error: "Informe um nome válido." }),
  category: z.string().min(1, { error: "Selecione uma categoria." }),
  amount: z.coerce
    .number({ error: "Informe um valor que seja válído." })
    .positive({ error: "Informe um valor que seja válído maior que 0." }),
});

export function Refund() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [filename, setFilename] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true);

      if (!filename) {
        return alert("Anexe um arquivo de comprovanete válido.");
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", filename);

      const response = await api.post("/uploads", fileUploadForm);

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      });

      await api.post("/refunds", {
        ...data,
        filename: response.data.filename,
      });

      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      return alert("Não foi possível realizar solicitação.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-gray-500 flex flex-col rounded-lg lg:w-min[512px] p-10 gap-6"
      >
        <header>
          <h1 className="font-bold text-xl text-gray-100">
            Solicitação de reembolso
          </h1>
          <p className="text-gray-200 text-sm mt-3 mb-10">
            Dados da despesa para solicitar reembolso
          </p>
        </header>

        <Input
          required
          legend="Nome da solicitação"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={params.id ? true : false}
        />

        <div className="flex gap-4">
          <Select
            required
            legend="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={params.id ? true : false}
          >
            {CATEGORIES_KEYS.map((category) => (
              <option key={category} value={category}>
                {CATEGORIES[category].name}
              </option>
            ))}
          </Select>

          <Input
            legend="Valor"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={params.id ? true : false}
          />
        </div>

        {params.id ? (
          <a
            href="https://google.com.br"
            target="_blank"
            className="flex items-center justify-center gap-2 font-semibold text-sm text-green-100 my-6 hover:opacity-60 transition ease-linear"
          >
            <img src={fileSvg} alt="Ícone de File para abrir comprovante" />
            Abrir Comprovante
          </a>
        ) : (
          <Upload
            legend="Comprovante"
            filename={filename ? filename.name : null}
            onChange={(e) => e.target.files && setFilename(e.target.files[0])}
          />
        )}

        <Button type="submit" isLoading={isLoading}>
          {params.id ? "Voltar" : "Enviar"}
        </Button>
      </form>
    </>
  );
}
