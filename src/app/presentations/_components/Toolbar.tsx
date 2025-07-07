/**
 * The Image component used is an image icon, not an actual image
 */
/* eslint-disable jsx-a11y/alt-text */

import IconButton from "@/ui/IconButton";
import { Image, Type } from "lucide-react";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";

export default function Toolbar() {
  const dispatch = useDispatch();

  const handleAddText = () => {
    dispatch(PresentationStore.addText());
  };

  return (
    <ul className="flex items-center gap-2">
      <li>
        <IconButton>
          <Image />
        </IconButton>
      </li>
      <li>
        <IconButton onClick={handleAddText}>
          <Type />
        </IconButton>
      </li>
    </ul>
  );
}
