"use client";

import { Slide } from "@/lib/models/Slide";
import { Layer, Stage } from "react-konva";
import SlideElement from "../presentations/_components/SlideElement";

enum PreviewSize {
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
      <Stage
        width={PreviewSize.WIDTH}
        height={PreviewSize.HEIGHT}
        scaleX={0.25}
        scaleY={0.25}
        s
      >
        <Layer>
          {(slide?.elements ?? [])
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
  );
}
