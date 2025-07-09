"use client";

import { Slide } from "@/lib/models/Slide";
import { DefaultSlidePresentationPreview } from "../presentations/_components/DefaultSlide";
import scope from "@/lib/helpers/scope";
import { MultipleChoiceSlidePresentationPreview } from "../presentations/_components/MultipleChoiceSlide";

export enum PreviewSize {
  WIDTH = 320,
  HEIGHT = 180,
}

type Props = {
  slide?: Slide;
};

export default function PresentationSlidePreview(props: Props) {
  const { slide } = props;

  if (!slide) return null;

  return (
    <div
      className={`rounded-3xl w-[${PreviewSize.WIDTH}] h-[${PreviewSize.HEIGHT}] bg-[#FDFCFA] border-1 border-solid border-black/15`}
    >
      {scope(() => {
        switch (slide.type) {
          case "default":
            return <DefaultSlidePresentationPreview slide={slide} />;
          case "multiple-choice":
            return <MultipleChoiceSlidePresentationPreview slide={slide} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
