"use client";

import where from "@/lib/helpers/where";
import useSelector from "@/lib/store/hooks/useSelector";
import { Layer, Stage } from "react-konva";
import SlideElement from "./SlideElement";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";
import Konva from "konva";

enum SlideEditorSize {
  WIDTH = 1280,
  HEIGHT = 720,
}

export default function SlideEditor() {
  const dispatch = useDispatch();

  const selectedSlide = useSelector((state) =>
    state.presentation.slides.find(
      where("id").equals(state.presentation.selectedSlide)
    )
  );

  const handleClick = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const clickedOnEmpty = event.target === event.target.getStage();

    if (clickedOnEmpty) {
      dispatch(PresentationStore.clearElementSelection());
    }
  };

  return (
    <main
      className={`bg-[#FDFCFA] border-1 border-solid border-black/15 rounded-3xl overflow-hidden`}
    >
      <Stage
        width={SlideEditorSize.WIDTH}
        height={SlideEditorSize.HEIGHT}
        onMouseDown={handleClick}
        onTouchStart={handleClick}
      >
        <Layer>
          {selectedSlide?.elements
            .map((element) => (
              <SlideElement element={element} key={element.id} />
            ))
            .filter(Boolean)}
        </Layer>
      </Stage>
    </main>
  );
}
