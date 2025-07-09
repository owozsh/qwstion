import React, { useEffect, useState } from "react";
import { Plus, Check, Trash2, Save, Pencil } from "lucide-react";
import { v4 } from "uuid";
import Label from "@/ui/Label";
import IconButton from "@/ui/IconButton";
import { useDispatch } from "react-redux";
import useSelector from "@/lib/store/hooks/useSelector";
import where from "@/lib/helpers/where";
import { MultipleChoiceSlide as MultipleChoiceSlideType } from "@/lib/models/Slide";
import PresentationStore from "../_store/PresentationStore";
import { useBoolean } from "@/lib/hooks/useBoolean";

export default function MultipleChoiceSlide() {
  const dispatch = useDispatch();

  const selectedSlide = useSelector((state) =>
    state.presentation.slides.find(
      where("id").equals(state.presentation.selectedSlide)
    )
  ) as MultipleChoiceSlideType;

  const {
    value: isEditing,
    setFalse: stopEditing,
    setTrue: startEditing,
  } = useBoolean(false);

  const [question, setQuestion] = useState(selectedSlide.question);
  const [choices, setChoices] = useState(selectedSlide.choices);
  const [correctChoice, setCorrectChoice] = useState<string | null>(
    selectedSlide.correctChoice
  );

  useEffect(() => {
    stopEditing();
    setQuestion(selectedSlide.question);
    setChoices(selectedSlide.choices);
    setCorrectChoice(selectedSlide.correctChoice);
  }, [selectedSlide, stopEditing]);

  const addChoice = () => {
    setChoices([
      ...choices,
      {
        id: v4(),
        text: "",
      },
    ]);
  };

  const removeChoice = (id: string) => {
    if (choices.length > 2) {
      setChoices(choices.filter((choice) => choice.id !== id));
    }
  };

  const updateChoice = (id: string, text: string) => {
    setChoices(
      choices.map((choice) => (choice.id === id ? { ...choice, text } : choice))
    );
  };

  const handleSave = () => {
    stopEditing();
    dispatch(
      PresentationStore.updateSlide({
        choices,
        question,
        correctChoice,
      } as MultipleChoiceSlideType)
    );
  };

  const isFormValid =
    correctChoice &&
    question.trim() &&
    choices.every((choice) => choice.text.trim().length > 0);

  return (
    <div className="flex flex-col gap-6 flex-1 h-full py-20 px-80">
      <div>
        <Label htmlFor="question">Question</Label>
        <input
          id="question"
          type="text"
          value={question}
          readOnly={!isEditing}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question..."
          className="w-full px-4 py-2 bg-[#faf9f5] border border-black/10 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          required
        />
      </div>

      <div>
        <Label htmlFor="question">Choices</Label>
        <div className="flex flex-col gap-3">
          {choices.map((choice, index) => (
            <div key={choice.id} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-[#faf9f5] border-1 border-solid border-black/10 rounded-full flex items-center justify-center text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>

              <input
                type="text"
                value={choice.text}
                readOnly={!isEditing}
                onChange={(e) => updateChoice(choice.id, e.target.value)}
                placeholder={`Choice ${String.fromCharCode(65 + index)}`}
                className="flex-1 px-4 py-2 bg-[#faf9f5] border border-black/10 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />

              {isEditing && (
                <>
                  <IconButton
                    onClick={() => setCorrectChoice(choice.id)}
                    className={`rounded-full transition-colors ${
                      choice.id === correctChoice
                        ? "bg-green-700 text-white"
                        : ""
                    }`}
                    title="Mark as correct answer"
                  >
                    <Check size={16} />
                  </IconButton>

                  {choices.length > 2 && (
                    <IconButton
                      onClick={() => removeChoice(choice.id)}
                      className="rounded-full transition-colors"
                      title="Remove choice"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {isEditing && (
        <IconButton onClick={addChoice} className="self-start">
          <Plus size={16} />
          <span>Add Choice</span>
        </IconButton>
      )}

      <div className="flex justify-between items-center pt-4">
        <div className="text-sm font-bold">
          {choices.filter((choice) => choice.id === correctChoice).length > 0
            ? `Correct answer: ${String.fromCharCode(
                65 + choices.findIndex((choice) => choice.id === correctChoice)
              )}`
            : "No correct answer selected"}
        </div>

        {isEditing ? (
          <IconButton
            onClick={handleSave}
            disabled={!isFormValid}
            className={`py-2 px-4 ${
              isFormValid ? "" : "bg-[#faf9f5] !cursor-not-allowed"
            }`}
          >
            <Save />
            Save
          </IconButton>
        ) : (
          <IconButton onClick={startEditing} className="py-2 px-4">
            <Pencil />
            Edit
          </IconButton>
        )}
      </div>
    </div>
  );
}

export function MultipleChoiceSlideNavigationPreview(props: {
  slide: MultipleChoiceSlideType;
}) {
  const { slide } = props;

  return (
    <div className="flex items-center justify-center p-4 max-w-[192px] max-h-[108px]">
      <span className="font-bold text-xs line-clamp-4">{slide.question}</span>
    </div>
  );
}
