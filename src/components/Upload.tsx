import uploadSvg from "../assets/upload.svg";

type Props = React.ComponentProps<"input"> & {
  legend?: string;
  filename?: string | null;
};

export function Upload({ legend, filename, ...rest }: Props) {
  return (
    <>
      <div>
        <legend className="uppercase text-xxs text-gray-200 mb-2 ">
          {legend}
        </legend>

        <div
          className="w-full h-12 flex items-center border border-gray-300 
        rounded-lg text-sm text-gray-100 bg-transparent outline-none"
        >
          <input type="file" id="upload" className="hidden" {...rest} />

          <span className="text-xs flex-1 pl-4 text-gray-100">
            {filename ?? "Selecione um arquivo"}
          </span>

          <label
            htmlFor="upload"
            className="flex h-12 px-4 items-center bg-green-100 rounded-lg cursor-pointer 
            disabled:opacity-50 hover:bg-green-200 transition ease-linears"
          >
            <img src={uploadSvg} alt="Ícone para upload de arquivo" />
          </label>
        </div>
      </div>
    </>
  );
}
