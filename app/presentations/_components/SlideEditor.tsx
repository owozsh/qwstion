"use client";

import where from "@/lib/helpers/where";
import useSelector from "@/lib/store/hooks/useSelector";
import { Loader } from "lucide-react";
import scope from "@/lib/helpers/scope";
import DefaultSlide from "./DefaultSlide";
import MultipleChoiceSlide from "./MultipleChoiceSlide";

const SLIDE_CONTAINER_STYLE = `w-[1280px] h-[720px] flex items-center justify-center bg-[#FDFCFA] border-1 border-solid border-black/15 rounded-3xl overflow-hidden`;

type Props = {
  isLoading?: boolean;
};

export default function SlideEditor(props: Props) {
  const { isLoading = false } = props;

  const selectedSlide = useSelector((state) =>
    state.presentation.slides.find(
      where("id").equals(state.presentation.selectedSlide)
    )
  );

  if (isLoading) {
    return (
      <main className={SLIDE_CONTAINER_STYLE}>
        <Loader className="animate-spin" />
      </main>
    );
  }

  return (
    <main className={SLIDE_CONTAINER_STYLE}>
      {scope(() => {
        switch (selectedSlide?.type) {
          case "default":
            return <DefaultSlide />;
          case "multiple-choice":
            return <MultipleChoiceSlide />;
          default:
            return null;
        }
      })}
    </main>
  );
}
