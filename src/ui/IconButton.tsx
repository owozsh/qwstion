import { Children, ReactNode } from "react";
import Button from "./Button";
import scope from "@/lib/helpers/scope";

type Props = {
  children: ReactNode;
};

export default function IconButton(props: Props) {
  const { children } = props;

  const className = scope(() => {
    const hasLabel = Children.count(children) > 1;

    return hasLabel ? "gap-x-1.5 px-3" : undefined;
  });

  return <Button className={`${className} p-2`}>{children}</Button>;
}
