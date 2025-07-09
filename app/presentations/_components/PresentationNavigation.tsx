"use client";

import { Layer, Stage } from "react-konva";
import SlideElement from "./SlideElement";
import { X } from "lucide-react";
import PresentationStore from "../_store/PresentationStore";
import { useDispatch } from "react-redux";
import useSelector from "@/lib/store/hooks/useSelector";
import IconButton from "@/ui/IconButton";
import NewSlide from "./NewSlide";

enum SlidePreviewSize {
  WIDTH = 192,
  HEIGHT = 108,
}

export const PREVIEW_STYLE =
  "flex items-center justify-center bg-[#FDFCFA] border-1 border-solid border-black/15 hover:border-black/30 hover:-translate-y-1 transition-transform ease-in-out cursor-pointer rounded-3xl min-w-[192px] h-[108px] overflow-hidden";

function getSlideNumberStyle(params: { index: number; selectedSlide: number }) {
  const colors =
    params.index === params.selectedSlide
      ? "bg-[#141413] text-[#faf9f5]"
      : "text-[#141413]";

  const style =
    "flex items-center justify-center rounded-full w-6 h-6 text-sm font-bold";

  return style.concat(" ").concat(colors);
}

export default function PresentationNavigation() {
  const dispatch = useDispatch();

  const slides = useSelector((state) => state.presentation.slides);

  const selectedSlide = useSelector(
    (state) => state.presentation.selectedSlide
  );

  const handleRemoveSlide =
    (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(PresentationStore.removeSlide(index));
    };

  const handleSelect = (index: number) => () => {
    dispatch(PresentationStore.selectSlide(index));
  };

  return (
    <ul className="flex gap-3 items-end max-h-[136px] overflow-visible">
      {slides.map((slide, index) => (
        <li
          className="relative flex flex-col items-center gap-1 group"
          key={slide.id}
          onClick={handleSelect(index)}
        >
          {slides.length > 1 && (
            <IconButton
              onClick={handleRemoveSlide(index)}
              className="absolute right-0 -translate-y-2.5 translate-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out z-10"
            >
              <X size={16} strokeWidth={3} />
            </IconButton>
          )}
          <div className={PREVIEW_STYLE}>
            <Stage
              width={SlidePreviewSize.WIDTH}
              height={SlidePreviewSize.HEIGHT}
              scaleX={0.15}
              scaleY={0.15}
              s
            >
              <Layer>
                {slide.elements
                  .map((element) => (
                    <SlideElement
                      element={element}
                      key={element.id}
                      disableTransform
                    />
                  ))
                  .filter(Boolean)}
              </Layer>
            </Stage>
          </div>
          <span
            className={getSlideNumberStyle({
              index,
              selectedSlide,
            })}
          >
            {index + 1}
          </span>
        </li>
      ))}
      <NewSlide />
    </ul>
  );
}
