import NewPresentation from "./_components/NewPresentation";
import PresentationPreview from "./_components/PresentationPreview";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-center py-20">
        <h3 className="font-black text-4xl">My Presentations</h3>
      </header>
      <main className="flex justify-center px-40">
        <ul className="grid gap-x-8 gap-y-8 2xl:grid-cols-4 grid-cols-3">
          {[0, 1].map((item) => (
            <PresentationPreview
              presentation={{
                id: item,
              }}
              key={item}
            />
          ))}
          <NewPresentation />
        </ul>
      </main>
    </>
  );
}
