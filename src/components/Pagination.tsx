import { Button } from "./Button";

import leftSvg from "../assets/left.svg";
import rightSvg from "../assets/right.svg";

type Props = {
  current: number;
  total: number;
};

export function Pagination({ current, total }: Props) {
  return (
    <>
      <div className="flex flex-1 justify-center items-center gap-3">
        <Button variant="iconSmall">
          <img src={leftSvg} alt="Ícone para voltar" />
        </Button>

        <span className="text-sm text-gray-100">
          {current}/{total}
        </span>

        <Button variant="iconSmall">
          <img src={rightSvg} alt="Ícone para avançar" />
        </Button>
      </div>
    </>
  );
}
