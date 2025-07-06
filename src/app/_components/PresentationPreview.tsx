import { Presentation } from "@/lib/models/Presentation";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

type Props = {
  presentation: Presentation;
};

enum CardSize {
  WIDTH = "320px",
  HEIGHT = "180px",
}

export default function PresentationPreview(props: Props) {
  const { presentation } = props;

  return (
    <Link href={`/presentations/${presentation.id}`}>
      <li
        className={`flex flex-col item-center gap-y-3 hover:cursor-pointer hover:-translate-y-1 transition-transform ease-in-out w-[${CardSize.WIDTH}]`}
      >
        <ViewTransition name={`presentation-${presentation.id}`}>
          <div
            className={`rounded-3xl w-[${CardSize.WIDTH}] h-[${CardSize.HEIGHT}] bg-amber-400 border-1 border-solid border-black/15`}
          ></div>
        </ViewTransition>
        <h3 className="text-center font-bold line-clamp-2">
          {presentation.title}
        </h3>
      </li>
    </Link>
  );
}
