import IconButton from "@/ui/IconButton";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import Toolbar from "./Toolbar";

export default function PresentationHeader() {
  return (
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
  );
}
