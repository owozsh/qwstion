import { SlideElement as SlideElementType } from "@/lib/models/Slide";
import useSelector from "@/lib/store/hooks/useSelector";
import { Text, Transformer } from "react-konva";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";
import { useEffect, useRef } from "react";
import scope from "@/lib/helpers/scope";
import { Box } from "konva/lib/shapes/Transformer";
import Konva from "konva";

const MIN_ELEMENT_SIZE = 50;
const ENABLED_RESIZE_ANCHORS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

function handleResizeBoundBox(oldBox: Box, newBox: Box) {
  const canBeResized =
    Math.abs(newBox.width) > MIN_ELEMENT_SIZE &&
    Math.abs(newBox.height) > MIN_ELEMENT_SIZE;

  return canBeResized ? newBox : oldBox;
}

type Props = {
  element: SlideElementType;
  disableTransform?: boolean;
};

export default function SlideElement(props: Props) {
  const { disableTransform = false } = props;

  const dispatch = useDispatch();

  const isSelected = useSelector(
    (state) => state.presentation.selectedElement === props.element.id
  );

  const ref = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([ref.current]);
    }
  }, [isSelected, transformerRef, ref]);

  const handleSelect = () => {
    if (disableTransform) return;
    dispatch(PresentationStore.selectElement(props.element.id));
  };

  const handleTransform = (
    event: Konva.KonvaEventObject<DragEvent | Event>
  ) => {
    const { x, y, scaleX, scaleY, width, height, rotation } =
      event.target.attrs;

    dispatch(
      PresentationStore.updateElement({
        ...props.element,
        transform: {
          ...props.element.transform,
          x,
          y,
          scaleX,
          scaleY,
          width,
          height,
          rotation,
        },
      })
    );
  };

  const element = scope(() => {
    switch (props.element.type) {
      case "text":
        return (
          <Text
            {...props.element.transform}
            ref={ref}
            isSelected={isSelected}
            onClick={handleSelect}
            onTap={handleSelect}
            draggable={!disableTransform}
            onTransformEnd={handleTransform}
            onDragEnd={handleTransform}
            text={props.element.text}
            fontSize={props.element.fontSize}
          />
        );
      default:
        return null;
    }
  });

  return (
    <>
      {element}
      {isSelected && !disableTransform && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={handleResizeBoundBox}
          flipEnabled={false}
          enabledAnchors={ENABLED_RESIZE_ANCHORS}
          rotateEnabled={false}
          anchorStroke="#141413"
          borderStroke="#141413"
        />
      )}
    </>
  );
}
