import IconButton from "@/ui/IconButton";
import { ImagePlus, Type } from "lucide-react";

export default function Toolbar() {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <IconButton>
          <ImagePlus />
        </IconButton>
      </li>
      <li>
        <IconButton>
          <Type />
        </IconButton>
      </li>
    </ul>
  );
}
