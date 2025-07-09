import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";
import { Plus, X } from "lucide-react";
import { SlideType } from "@/lib/models/Slide";
import { useBoolean } from "@/lib/hooks/useBoolean";
import scope from "@/lib/helpers/scope";
import IconButton from "@/ui/IconButton";

const SLIDE_OPTIONS: Array<{
  label: string;
  type: SlideType;
  color: string;
}> = [
  {
    label: "Multiple Choice",
    type: "multiple-choice",
    color: "#D38457",
  },
  // {
  //   label: "Word Cloud",
  //   type: "word-cloud",
  //   color: "#C25C5C",
  // },
  // {
  //   label: "Ranking",
  //   type: "ranking",
  //   color: "#C25C83",
  // },
  {
    label: "Default",
    type: "default",
    color: "#BB71C2",
  },
];

const SLIDE_OPTION_STYLE =
  "flex flex-1 items-center justify-center w-full min-h-[84px] text-white cursor-pointer rounded-xl min-w-[168px] font-bold border-1 border-solid border-black/15 hover:border-black/30 transition-transform hover:-translate-y-0.5";

export default function NewSlide() {
  const dispatch = useDispatch();

  const {
    value: slideSelectorIsVisible,
    setFalse: hideSlideSelector,
    setTrue: showSlideSelector,
  } = useBoolean(false);

  const handleAddSlide = (type: SlideType) => () => {
    hideSlideSelector();
    dispatch(
      PresentationStore.addSlide({
        type,
      })
    );
  };

  const content = scope(() =>
    slideSelectorIsVisible ? (
      SLIDE_OPTIONS.map((option) => (
        <button
          key={option.type}
          className={SLIDE_OPTION_STYLE}
          style={{
            backgroundColor: option.color,
          }}
          onClick={handleAddSlide(option.type)}
        >
          {option.label}
        </button>
      ))
    ) : (
      <button
        className={SLIDE_OPTION_STYLE}
        onClick={showSlideSelector}
        style={{
          borderStyle: "hidden",
        }}
      >
        <Plus size={24} strokeWidth={3} color="#141413" />
      </button>
    )
  );

  return (
    <li className="relative flex flex-col items-center gap-1">
      <div className="flex flex-col items-center justify-center bg-[#FDFCFA] border-1 border-solid border-black/15 hover:border-black/30 transition-transform hover:-translate-y-1 rounded-3xl min-w-[192px] min-h-[108px] overflow-hidden p-3 gap-3">
        {content}
      </div>
      {slideSelectorIsVisible && (
        <IconButton
          onClick={hideSlideSelector}
          className="absolute right-0 -translate-y-2.5 translate-x-2.5 transition-opacity ease-in-out z-10"
        >
          <X size={16} strokeWidth={3} />
        </IconButton>
      )}
      <span className="flex items-center justify-center rounded-full h-6 text-sm font-bold text-[#141413]">
        New Slide
      </span>
    </li>
  );
}
