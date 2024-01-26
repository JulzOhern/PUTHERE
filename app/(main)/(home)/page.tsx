import { getText } from "@/lib/getText";
import CreateText from "./_components/createText";
import TextCard from "./_components/textCard";

export default async function Home() {
  const text = await getText();

  return (
    <div className="max-w-[45rem] mx-auto min-h-screen">
      {text && text.length === 0 ? (
        <div className="min-h-[99vh] flex flex-col items-center justify-center">
          <div className="mb-3">
            <CreateText size="text-5xl" textColor="text-zinc-400" />
          </div>
          <p className="text-zinc-400 text-sm">
            Click the plus icon to add new text.
          </p>
        </div>
      ) : (
        <div className="gridCard gap-2 pt-20">
          <div className="fixed right-12 bottom-7 bg-zinc-400 rounded-full p-2">
            <CreateText size="text-2xl" textColor="text-white" />
          </div>
          {text.map((item) => (
            <TextCard key={item.id} text={item} />
          ))}
        </div>
      )}
    </div>
  );
}
