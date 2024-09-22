'use client'
import Image from "next/image"
import marker_icon from "@/public/images/marker.svg"
import paperclip_icon from "@/public/images/paperclip.svg"
import { useTodos } from "../store/context"


const InputComp = () => {
    const { handleAddTodo, todoText, setTodoText } = useTodos()

    const addToDo = () => {
        handleAddTodo(todoText)
        setTodoText("")
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); console.log(e); addToDo() }} className="flex">
            <Image className="rounded-l-md invert p-1" height={40} width={40} src={paperclip_icon} alt="paperclip-icon" />
            <input minLength={3} required onChange={(e) => { setTodoText(e.target.value) }} name="todoText" value={todoText} className="p-2 rounded-l-md outline-none text-black" type="text" placeholder='Add ToDo' />
            <button type="submit">
                <Image className="hover:bg-gray-200 cursor-pointer bg-[#d97338] rounded-r-md invert p-1" height={40} width={40} src={marker_icon} alt="marker-icon" />
            </button>
        </form >
    )
}

export default InputComp