import { Presentation } from "@/lib/models/Presentation";
import NewPresentation from "./_components/NewPresentation";
import PresentationPreview from "./_components/PresentationPreview";
import prisma from "@/lib/prisma";

export default async function Home() {
  const presentations: Presentation[] = await prisma.presentation.findMany();

  return (
    <>
      <header className="flex items-center justify-center py-20">
        <h3 className="font-black text-4xl">My Presentations</h3>
      </header>
      <main className="flex justify-center px-40">
        <ul className="grid gap-x-8 gap-y-8 2xl:grid-cols-4 grid-cols-3">
          {presentations.map((presentation) => (
            <PresentationPreview
              presentation={presentation}
              key={presentation.id}
            />
          ))}
          <NewPresentation />
        </ul>
      </main>
    </>
  );
}
