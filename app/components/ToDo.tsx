"use client"
import Image from "next/image"
import edit_icon from "@/public/images/edit.svg"
import trach_icon from "@/public/images/trash-2.svg"
import { Todo, useTodos } from "../store/context"

interface Todos {
    todos: Todo[]
}

const ToDo = ({ todos }: Todos) => {
    const { handleChecked, handleDelete, setTodoText, handleEdit } = useTodos()

    return (
        <div className="flex gap-10 items-center flex-col overflow-y-scroll h-[65vh]">

            {todos.map((todo) => {
                return <div key={todo.id} className="flex items-center gap-4">
                    <input onChange={() => { handleChecked(todo.id) }} className="cursor-pointer size-6" checked={todo.isCompleted} type="checkbox" />
                    <h1 className={`w-[40vw] ${todo.isCompleted === true ? "line-through" : ""}`}>{todo.task}</h1>
                    <div className="flex gap-3">
                        <Image onClick={() => { handleEdit(todo.id); setTodoText(todo.task) }} className="hover:bg-gray-200 cursor-pointer px-5 bg-[#a27fe4] rounded-md invert p-1" height={60} width={60} src={edit_icon} alt="edit_icon" />
                        <Image onClick={() => { handleDelete(todo.id) }} className="hover:bg-gray-200 cursor-pointer px-5 bg-[#65ffe7] rounded-md invert p-1" height={60} width={60} src={trach_icon} alt="trach_icon" />
                    </div>
                </div>
            })}

        </div>
    )
}

export default ToDo