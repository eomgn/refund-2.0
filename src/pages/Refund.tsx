import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";

import fileSvg from "../assets/file.svg";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/Categories";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";

export function Refund() {
  const [name, setName] = useState("Teste");
  const [category, setCategory] = useState("transport");
  const [amount, setAmount] = useState("34");
  const [filename, setFilename] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  console.log(params);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    navigate("/confirm", { state: { fromSubmit: true } });

    console.log(name, category, amount, filename);
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
