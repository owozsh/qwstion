import { Plus } from "lucide-react";

export default function NewPresentation() {
  return (
    <li className="flex flex-col item-center gap-y-3 hover:cursor-pointer hover:-translate-y-1 transition-transform ease-in-out w-[${CardSize.WIDTH}]">
      <div className="flex items-center justify-center rounded-3xl w-[320px] h-[180px] bg-[#FDFCFA] border-1 border-solid border-black/15">
        <Plus size={36} color="#818080" strokeWidth={4} />
      </div>
      <h3 className="text-center font-bold ">New Presentation</h3>
    </li>
  );
}
