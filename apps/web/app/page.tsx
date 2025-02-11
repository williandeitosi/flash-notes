import Card from "./components/card";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden p-2 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold text-center py-6">Flash Notes</h1>

      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-12 h-full gap-4 ">
          <div className="col-span-4  border-purple-900 border-r-2  overflow-hidden rounded-lg flex flex-col ">
            <h2 className="text-center text-purple-900 text-3xl">NOTAS</h2>
            <div className="h-full overflow-y-auto">
              <Card title="Nota 1" description="Descripción de la nota 1" />
            </div>
            <button className=" mt-auto font-bold bg-gradient-to-r from-sky-700 to-purple-900 p-2 rounded-lg w-[90%] mx-auto">
              +
            </button>
          </div>
          <div className="col-span-8 border-sky-700 border-l-2 overflow-hidden rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
