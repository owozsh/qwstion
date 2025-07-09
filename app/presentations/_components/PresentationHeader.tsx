"use client";

import IconButton from "@/ui/IconButton";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import Toolbar from "./Toolbar";
import { useDispatch } from "react-redux";
import PresentationStore from "../_store/PresentationStore";
import Title from "./Title";
import { useRouter } from "next/navigation";
import Presentations from "@/lib/api/presentations";
import useSelector from "@/lib/store/hooks/useSelector";
import { useSWRConfig } from "swr";
import Routes, { getRoute } from "@/lib/routes";

export default function PresentationHeader() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { mutate } = useSWRConfig();

  const presentation = useSelector((state) => state.presentation);

  const handleSave = () => {
    if (!presentation.id) return;

    Presentations.update(presentation.id, {
      title: presentation.title,
      slides: presentation.slides,
    }).then(() => {
      mutate(getRoute(Routes.Presentations.all)).then(() => {
        router.push("/");
        dispatch(PresentationStore.reset());
      });
    });
  };

  return (
    <header className="flex items-center">
      <div className="flex justify-start flex-1 gap-3">
        <Link href="/">
          <IconButton onClick={handleSave}>
            <ChevronLeft />
            My Presentations
          </IconButton>
        </Link>
        <Title />
      </div>
      <Toolbar />
      <div className="flex justify-end flex-1">
        <IconButton onClick={handleSave}>
          <Save />
          Save
        </IconButton>
      </div>
    </header>
  );
}
