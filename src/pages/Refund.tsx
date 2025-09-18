import { Input } from "../components/Input";

export function Refund() {
  return (
    <>
      <form className="bg-gray-500 flex flex-col rounded-lg lg:w-min[512px] p-10 gap-6">
        <header>
          <h1 className="font-bold text-xl text-gray-100">
            Solicitação de reembolso
          </h1>
          <p className="text-gray-200 text-sm mt-3 mb-10">
            Dados da despesa para solicitar reembolso
          </p>
        </header>

        <Input required legend="Nome da solicitação" />
      </form>
    </>
  );
}
