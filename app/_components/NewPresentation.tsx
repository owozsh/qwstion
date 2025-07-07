"use client";

import { Plus } from "lucide-react";
import {
  useEffect,
  useState,
  unstable_ViewTransition as ViewTransition,
} from "react";
import Presentations from "@/lib/api/presentations";
import { useRouter } from "next/navigation";
import { Presentation } from "@/lib/models/Presentation";

export default function NewPresentation() {
  const router = useRouter();

  const [id, setId] = useState<null | string>(null);

  const handleCreatePresentation = async () => {
    Presentations.create({
      title: "New Presentation",
    }).then(async (response) => {
      const presentation = (await response.json()) as Presentation;
      setId(presentation.id);
      router.push(`/presentations/${presentation.id}`);
    });
  };

  useEffect(() => {
    if (!id) return;

    const timeout = setTimeout(() => router.push(`/presentations/${id}`), 16);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, id]);

  return (
    <li
      className="flex flex-col item-center gap-y-3 hover:cursor-pointer hover:-translate-y-1 transition-transform ease-in-out w-[${CardSize.WIDTH}]"
      onClick={handleCreatePresentation}
    >
      <ViewTransition name={`presentation-${id}`}>
        <div className="flex items-center justify-center rounded-3xl w-[320px] h-[180px] bg-[#FDFCFA] border-1 border-solid border-black/15">
          <Plus size={36} strokeWidth={4} />
        </div>
      </ViewTransition>
      <h3 className="text-center font-bold ">New Presentation</h3>
    </li>
  );
}
