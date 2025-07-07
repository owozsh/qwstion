import { ButtonHTMLAttributes, Children } from "react";
import Button from "./Button";
import scope from "@/lib/helpers/scope";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton(props: Props) {
  const { children, ...buttonProps } = props;

  const className = scope(() => {
    const hasLabel = Children.count(children) > 1;

    return hasLabel ? "gap-x-1.5 px-3" : undefined;
  });

  return (
    <Button
      {...buttonProps}
      className={`${className} p-2 ${buttonProps.className}`}
    >
      {children}
    </Button>
  );
}
