import { useState, type FormEvent } from "react";

import searchSvg from "../assets/search.svg";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RefundItem } from "../components/RefundItem";
import { Pagination } from "../components/Pagination";

import { CATEGORIES } from "../utils/Categories";
import { formatCurrency } from "../utils/formatCurrency";

const REFUND_EXAMPLE = {
  id: "123",
  name: "Matheus",
  category: CATEGORIES.transport.name,
  amount: formatCurrency(34.5),
  categoryItem: CATEGORIES.transport.icon,
};

export function Dashboard() {
  const [name, setName] = useState("");

  function fectchRefunds(e: FormEvent) {
    e.preventDefault();

    console.log(name);
  }

  return (
    <>
      <div className="bg-gray-500 p-10 rounded-lg text-gray-100 md:min-w-[768px]">
        <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

        <form
          onSubmit={fectchRefunds}
          className="flex flex-1 item-center justify-center pb-12 mt-6 gap-3 border-b-[1px] border-b-gray-400 "
        >
          <Input
            placeholder="Pesquisar pelo nome"
            onChange={(e) => setName(e.target.value)}
          />

          <Button type="submit" variant="icon">
            <img src={searchSvg} alt="Ícone de pesquisar" className="w-5" />
          </Button>
        </form>

        <div className="mt-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
          <RefundItem data={REFUND_EXAMPLE}></RefundItem>
        </div>

        <Pagination current={1} total={10} />
      </div>
    </>
  );
}
