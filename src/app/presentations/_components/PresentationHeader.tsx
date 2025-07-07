"use client";

import IconButton from "@/ui/IconButton";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import Toolbar from "./Toolbar";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";

export default function PresentationHeader() {
  const dispatch = useDispatch();

  const resetPresentationState = () => {
    dispatch(PresentationStore.reset());
  };

  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <IconButton onClick={resetPresentationState}>
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
  );
}
