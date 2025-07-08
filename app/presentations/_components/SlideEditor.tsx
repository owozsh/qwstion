"use client";

import where from "@/lib/helpers/where";
import useSelector from "@/lib/store/hooks/useSelector";
import { Layer, Stage } from "react-konva";
import SlideElement from "./SlideElement";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";
import Konva from "konva";
import { Loader } from "lucide-react";

enum SlideEditorSize {
  WIDTH = 1280,
  HEIGHT = 720,
}

const SLIDE_CONTAINER_STYLE = `w-[1280px] h-[720px] flex items-center justify-center bg-[#FDFCFA] border-1 border-solid border-black/15 rounded-3xl overflow-hidden`;

type Props = {
  isLoading?: boolean;
};

export default function SlideEditor(props: Props) {
  const { isLoading = false } = props;

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

  if (isLoading) {
    return (
      <main className={SLIDE_CONTAINER_STYLE}>
        <Loader className="animate-spin" />
      </main>
    );
  }

  return (
    <main className={SLIDE_CONTAINER_STYLE}>
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
