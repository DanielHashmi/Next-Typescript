"use client"
import InputComp from "@/app/components/InputComp";
import SwitchNav from "@/app/components/SwitchNav";
import ToDo from "@/app/components/ToDo";
import { useTodos } from "@/app/store/context";
import Image from "next/image"
import pen_icon from "@/public/images/pen.svg";
import { useSearchParams } from "next/navigation";

export default function Pages() {
  const { todos } = useTodos()
  const searchParams = useSearchParams()
  const params = searchParams.get("params")
  return (
    <div className="bg-gray-900 h-screen items-center text-white justify-center sm:p-10 overflow-hidden transition-all duration-1000">
      <div className="flex flex-col items-center gap-5 mt-[7vh]">
        <Image className="invert" height={80} width={80} src={pen_icon} alt="paperclip-icon" />

        <h1 className="font-bold text-center text-4xl "><span className="text-sky-500">Type</span><span className="myShadow">Script</span> + Next<span className="text-yellow-400 myShadow">JS</span> To<span className="bg-red-700">DoList</span></h1>
        <SwitchNav params={params} />
        <InputComp />
        <ToDo todos={todos.filter((todo) => {
          if (params === "completed") {
            return todo.isCompleted === true
          } else if (params === "active") {
            return todo.isCompleted !== true
          } else {
            return todo
          }
        })} />
      </div>
    </div>
  );
}
