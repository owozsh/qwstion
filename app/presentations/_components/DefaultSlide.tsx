import where from "@/lib/helpers/where";
import useSelector from "@/lib/store/hooks/useSelector";
import Konva from "konva";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";
import { Layer, Stage } from "react-konva";
import SlideElement from "./SlideElement";
import { DefaultSlide as DefaultSlideType } from "@/lib/models/Slide";
import { SlidePreviewSize } from "./PresentationNavigation";

enum SlideEditorSize {
  WIDTH = 1280,
  HEIGHT = 720,
}

export default function DefaultSlide() {
  const dispatch = useDispatch();

  const selectedSlide = useSelector((state) =>
    state.presentation.slides.find(
      where("id").equals(state.presentation.selectedSlide)
    )
  ) as DefaultSlideType;

  const handleClick = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const clickedOnEmpty = event.target === event.target.getStage();

    if (clickedOnEmpty) {
      dispatch(PresentationStore.clearElementSelection());
    }
  };

  return (
    <Stage
      width={SlideEditorSize.WIDTH}
      height={SlideEditorSize.HEIGHT}
      onMouseDown={handleClick}
      onTouchStart={handleClick}
    >
      <Layer>
        {selectedSlide?.elements
          .map((element) => <SlideElement element={element} key={element.id} />)
          .filter(Boolean)}
      </Layer>
    </Stage>
  );
}

export function DefaultSlideNavigationPreview(props: {
  slide: DefaultSlideType;
}) {
  const { slide } = props;

  return (
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
            <SlideElement element={element} key={element.id} disableTransform />
          ))
          .filter(Boolean)}
      </Layer>
    </Stage>
  );
}
