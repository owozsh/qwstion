"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import SlideEditor from "../_components/SlideEditor";
import PresentationHeader from "../_components/PresentationHeader";
import PresentationNavigation from "../_components/PresentationNavigation";

export default function NewPresentation() {
  return (
    <div className="flex flex-col h-screen overflow-hidden p-5 gap-y-5 justify-between 2xl:px-[15%]">
      <PresentationHeader />
      <div className="flex justify-center">
        <ViewTransition name="presentation-new">
          <SlideEditor />
        </ViewTransition>
      </div>
      <PresentationNavigation />
    </div>
  );
}
