import { useState, useEffect } from "react";

import { AxiosError } from "axios";
import { api } from "../services/api";

import searchSvg from "../assets/search.svg";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RefundItem, type RefundItemProps } from "../components/RefundItem";
import { Pagination } from "../components/Pagination";

import { CATEGORIES } from "../utils/Categories";
import { formatCurrency } from "../utils/formatCurrency";

const PER_PAGE = 5;

export function Dashboard() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalOfPage, setTotalOfPage] = useState(0);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([]);

  async function fectchRefunds() {
    try {
      const response = await api.get<RefundsPaginationAPIResponse>(
        `${"/refunds"}?name=${name}&page=${page}&perPage=${PER_PAGE}`
      );

      setRefunds(
        response.data.refunds.map((refund) => ({
          id: refund.id,
          name: refund.user.name,
          description: refund.name,
          amount: formatCurrency(refund.amount),
          categoryItem: CATEGORIES[refund.category].icon,
        }))
      );

      // console.log(response.data);
      setTotalOfPage(response.data.totalPages);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar.");
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    fectchRefunds();
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalOfPage) {
        return prevPage + 1;
      }

      if (action === "previous" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  }

  useEffect(() => {
    fectchRefunds();
  }, [page]);

  return (
    <>
      <div className="bg-gray-500 p-10 rounded-lg text-gray-100 md:min-w-[768px]">
        <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

        <form
          onSubmit={onSubmit}
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

        <div className="my-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
          {refunds.map((refund) => (
            <RefundItem
              key={refund.id}
              data={refund}
              href={`refund/${refund.id}`}
            />
          ))}
        </div>

        <Pagination
          current={page}
          total={totalOfPage}
          onNext={() => handlePagination("next")}
          onPrevious={() => handlePagination("previous")}
        />
      </div>
    </>
  );
}
