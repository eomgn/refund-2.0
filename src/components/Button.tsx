import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon";
};

const variants = {
  button: {
    base: "h-12",
    icon: "h-12 w-12",
    iconSmall: "h-10 w-10",
  },
};

export function Button({
  children,
  isLoading,
  type = "button",
  variant = "base",
  className,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      {...rest}
      className={classMerge([
        "flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 disabled:cursor-not-allowed",
        variants.button[variant],
        className,
      ])}
    >
      {children}
    </button>
  );
}
