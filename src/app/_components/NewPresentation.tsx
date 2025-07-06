import { Plus } from "lucide-react";
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";

export default function NewPresentation() {
  return (
    <Link href="/presentations/new">
      <li className="flex flex-col item-center gap-y-3 hover:cursor-pointer hover:-translate-y-1 transition-transform ease-in-out w-[${CardSize.WIDTH}]">
        <ViewTransition name="presentation-new">
          <div className="flex items-center justify-center rounded-3xl w-[320px] h-[180px] bg-[#FDFCFA] border-1 border-solid border-black/15">
            <Plus size={36} strokeWidth={4} />
          </div>
        </ViewTransition>
        <h3 className="text-center font-bold ">New Presentation</h3>
      </li>
    </Link>
  );
}
