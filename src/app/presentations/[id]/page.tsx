import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import SlideEditor from "./_components/SlideEditor";
import { Slide } from "@/lib/models/Slide";
import IconButton from "@/ui/IconButton";
import Toolbar from "./_components/Toolbar";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Presentation(props: Props) {
  const { params } = props;

  const { id } = await params;

  const slides: Slide[] = [
    {
      id: 0,
      elements: [],
    },
  ];

  const slide = slides.at(0);

  return (
    <div className="flex flex-col h-screen overflow-hidden p-5 gap-y-5 justify-between 2xl:px-[15%]">
      <header className="flex items-center justify-between">
        <Link href="/">
          <IconButton>
            <ChevronLeft />
            My Presentations
          </IconButton>
        </Link>
        <Toolbar />
        <IconButton>
          <Save />
          Save
        </IconButton>
      </header>
      <div className="flex justify-center">
        <ViewTransition name={`presentation-${id}`}>
          <SlideEditor slide={slide} />
        </ViewTransition>
      </div>
      <ul className="bg-[#FDFCFA] border-1 border-solid border-black/15 rounded-3xl h-30">
        <li></li>
      </ul>
    </div>
  );
}
