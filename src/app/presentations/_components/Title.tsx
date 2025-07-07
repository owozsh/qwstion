import useSelector from "@/lib/store/hooks/useSelector";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";
import Button from "@/ui/Button";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER = "Presentation Title";

export default function Title() {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.presentation.title);

  const [width, setWidth] = useState(0);

  const input = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const measureText = (text: string): number => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx || !input.current) return 0;

    const computedStyle = window.getComputedStyle(input.current);
    ctx.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;

    return ctx.measureText(text).width;
  };

  const handleChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const newValue = event?.target.value ?? "";

    dispatch(PresentationStore.updateTitle(newValue));

    const textToMeasure = newValue.length > 0 ? newValue : PLACEHOLDER;
    const measuredWidth = measureText(textToMeasure);
    setWidth(measuredWidth + 4);
  };

  useEffect(() => {
    const textToMeasure = title.length > 0 ? title : PLACEHOLDER;
    const measuredWidth = measureText(textToMeasure);
    setWidth(measuredWidth + 4);
  }, [title]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    input.current?.focus();
  };

  return (
    <Button
      className="flex justify-start px-3 cursor-text"
      onClick={handleClick}
    >
      <input
        name="presentation-title"
        ref={input}
        type="text"
        value={title}
        onChange={handleChangeTitle}
        placeholder={PLACEHOLDER}
        className="focus:outline-none active:outline-none z-10"
        style={{
          width,
        }}
      />
    </Button>
  );
}
