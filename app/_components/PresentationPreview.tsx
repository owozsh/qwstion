"use client";

import { Presentation } from "@/lib/models/Presentation";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import IconButton from "@/ui/IconButton";
import { X } from "lucide-react";
import PresentationSlidePreview from "./PresentationSlidePreview";
import { deletePresentation } from "../actions";

type Props = {
  presentation: Presentation;
};

export default function PresentationPreview(props: Props) {
  const { presentation } = props;

  const preview = presentation.slides.at(0);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deletePresentation(presentation.id);
  };

  return (
    <li
      className={`relative flex flex-col item-center gap-y-3 hover:cursor-pointer hover:-translate-y-1 transition-transform ease-in-out w-[320px] group`}
    >
      <IconButton
        onClick={handleDelete}
        className="absolute right-0 -translate-y-2.5 translate-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out z-10"
      >
        <X size={16} strokeWidth={3} />
      </IconButton>
      <Link href={`/presentations/${presentation.id}`}>
        <ViewTransition name={`presentation-${presentation.id}`}>
          <PresentationSlidePreview slide={preview} />
        </ViewTransition>
        <h3 className="text-center font-bold line-clamp-2">
          {presentation.title}
        </h3>
      </Link>
    </li>
  );
}
