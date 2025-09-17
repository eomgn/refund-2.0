export function NotFound() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-100 mb-10">
          Ops, essa página não existe. 🥲
        </h1>

        <a
          href="/"
          className="text-green-100 font-semibold cursor-pointer hover:text-green-200 transition ease-linear"
        >
          Voltar para o início.
        </a>
      </div>
    </>
  );
}
