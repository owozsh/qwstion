"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import SlideEditor from "../_components/SlideEditor";
import PresentationHeader from "../_components/PresentationHeader";
import PresentationNavigation from "../_components/PresentationNavigation";
import { store } from "@/lib/store/store";
import PresentationStore from "../_store/PresentationStore";
import { usePathname } from "next/navigation";

export default function Presentation() {
  const pathname = usePathname();

  const id = pathname?.split("/").at(-1) ?? "";

  store.dispatch(PresentationStore.setId(id));

  return (
    <div className="flex flex-col h-screen overflow-hidden p-5 gap-y-5 justify-between 2xl:px-[15%]">
      <PresentationHeader />
      <div className="flex justify-center">
        <ViewTransition name={`presentation-${id}`}>
          <SlideEditor />
        </ViewTransition>
      </div>
      <PresentationNavigation />
    </div>
  );
}
