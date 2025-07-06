import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: Props) {
  const { children, className, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={`flex items-center rounded-full bg-[#FDFCFA] border-1 border-solid border-black/15 hover:border-black/30 p-1 transition-colors cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
