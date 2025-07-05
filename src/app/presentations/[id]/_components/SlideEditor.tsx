"use client";

import scope from "@/lib/helpers/scope";
import { Slide } from "@/lib/models/Slide";
import { Box } from "konva/lib/shapes/Transformer";
import { Layer, Stage, Text, Transformer } from "react-konva";

const MIN_ELEMENT_SIZE = 50;

function handleResizeBoundBox(oldBox: Box, newBox: Box) {
  const canBeResized =
    newBox.width > MIN_ELEMENT_SIZE && newBox.height > MIN_ELEMENT_SIZE;

  return canBeResized ? newBox : oldBox;
}

enum SlideEditorSize {
  WIDTH = 1280,
  HEIGHT = 720,
}

type Props = {
  slide: Slide;
};

export default function SlideEditor(props: Props) {
  const { slide } = props;

  const elements = scope(() =>
    slide.elements
      .map((element) => {
        switch (element.type) {
          case "text":
            return <Text {...element.options} />;
          // case "image":
          //   return <Image {...element.options} image={} />;
          default:
            return null;
        }
      })
      .filter(Boolean)
  );

  return (
    <main
      className={`bg-[#FDFCFA] border-1 border-solid border-black/15 rounded-3xl w-[${SlideEditorSize.WIDTH}px] h-[${SlideEditorSize.HEIGHT}px] overflow-hidden`}
    >
      <Stage width={SlideEditorSize.WIDTH} height={SlideEditorSize.HEIGHT}>
        <Layer>
          {elements}

          <Transformer boundBoxFunc={handleResizeBoundBox} />
        </Layer>
      </Stage>
    </main>
  );
}
