"use client";

import IconButton from "@/ui/IconButton";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import Toolbar from "./Toolbar";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";
import Title from "./Title";

export default function PresentationHeader() {
  const dispatch = useDispatch();

  const resetPresentationState = () => {
    dispatch(PresentationStore.reset());
  };

  return (
    <header className="flex items-center">
      <div className="flex justify-start flex-1 gap-3">
        <Link href="/">
          <IconButton onClick={resetPresentationState}>
            <ChevronLeft />
            My Presentations
          </IconButton>
        </Link>
        <Title />
      </div>
      <Toolbar />
      <div className="flex justify-end flex-1">
        <IconButton>
          <Save />
          Save
        </IconButton>
      </div>
    </header>
  );
}
