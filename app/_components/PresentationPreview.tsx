"use client";

import { Presentation } from "@/lib/models/Presentation";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { Layer, Stage } from "react-konva";
import SlideElement from "../presentations/_components/SlideElement";
import IconButton from "@/ui/IconButton";
import { X } from "lucide-react";
import Presentations from "@/lib/api/presentations";
import { useSWRConfig } from "swr";
import Routes, { getRoute } from "@/lib/routes";

type Props = {
  presentation: Presentation;
};

enum PreviewSize {
  WIDTH = 320,
  HEIGHT = 180,
}

export default function PresentationPreview(props: Props) {
  const { presentation } = props;

  const preview = presentation.slides.at(0);

  const { mutate } = useSWRConfig();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    Presentations.delete(presentation.id).finally(() => {
      mutate(getRoute(Routes.Presentations.all));
    });
  };

  return (
    <li
      className={`relative flex flex-col item-center gap-y-3 hover:cursor-pointer hover:-translate-y-1 transition-transform ease-in-out w-[${PreviewSize.WIDTH}px] group`}
    >
      <IconButton
        onClick={handleDelete}
        className="absolute right-0 -translate-y-2.5 translate-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out z-10"
      >
        <X size={16} strokeWidth={3} />
      </IconButton>
      <Link href={`/presentations/${presentation.id}`}>
        <ViewTransition name={`presentation-${presentation.id}`}>
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
                {(preview?.elements ?? [])
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
        </ViewTransition>
        <h3 className="text-center font-bold line-clamp-2">
          {presentation.title}
        </h3>
      </Link>
    </li>
  );
}
