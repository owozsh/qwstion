import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ children, ...props }: Props) {
  return (
    <label className="block text-sm font-bold mb-2" {...props}>
      {children}
    </label>
  );
}
