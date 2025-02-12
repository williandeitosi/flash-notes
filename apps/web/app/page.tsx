import { FaSearch } from "react-icons/fa";
import Card from "./components/card";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden p-2 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold text-center py-6 ">Flash Notes</h1>

      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-12 h-full gap-4 ">
          <div className="col-span-3  border-purple-900 border-r-2  overflow-hidden rounded-lg flex flex-col ">
            <div className="flex gap-2 items-center justify-center mb-4">
              <h2 className=" text-purple-900 text-3xl ">Notes</h2>
              <div className="bg-zinc-800 rounded-full w-1/2 h-10 flex items-center justify-center cursor-pointer">
                <FaSearch size={20} className=" text-purple-900" />
              </div>
            </div>
            <div className="h-full overflow-y-auto flex flex-col gap-2 ">
              <Card
                title="Nota 1"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat consequatur accusantium blanditiis praesentium, maiores autem quae nobis quis animi unde eveniet beatae non laborum natus ipsam debitis porro commodi omnis!
"
              />
              <Card
                title="Nota 1"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat consequatur accusantium blanditiis praesentium, maiores autem quae nobis quis animi unde eveniet beatae non laborum natus ipsam debitis porro commodi omnis!
"
              />
              <Card
                title="Nota 1"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat consequatur accusantium blanditiis praesentium, maiores autem quae nobis quis animi unde eveniet beatae non laborum natus ipsam debitis porro commodi omnis!
"
              />
              <Card
                title="Nota 1"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat consequatur accusantium blanditiis praesentium, maiores autem quae nobis quis animi unde eveniet beatae non laborum natus ipsam debitis porro commodi omnis!
"
              />
              <Card
                title="Nota 1"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat consequatur accusantium blanditiis praesentium, maiores autem quae nobis quis animi unde eveniet beatae non laborum natus ipsam debitis porro commodi omnis!
"
              />
              <Card
                title="Nota 1"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat consequatur accusantium blanditiis praesentium, maiores autem quae nobis quis animi unde eveniet beatae non laborum natus ipsam debitis porro commodi omnis!
"
              />
            </div>
            <button className=" cursor-pointer mt-2 font-bold bg-gradient-to-r from-sky-700 to-purple-900 p-2 rounded-lg w-[90%] mx-auto">
              +
            </button>
          </div>
          <div className="col-span-9 border-sky-700 border-l-2 overflow-hidden rounded-lg">
            <h2 className="text-center text-sky-700 text-3xl">View</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
