'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
export const todosContext = createContext<TodosContext | null>(null)

export type Todo = {
    id: string;
    task: string;
    isCompleted: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    handleChecked: (id: string) => void;
    setTodos: Dispatch<SetStateAction<Todo[]>>;
    setTodoText: Dispatch<SetStateAction<string>>;
    todoText: string;
}

export const TodosProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoText, setTodoText] = useState('')
    const TodosBase: string = localStorage.getItem("Todos") || "[]"
    const parsedData: Todo[] = JSON.parse(TodosBase)
    useEffect(() => {
        setTodos(parsedData)
    }, [])

    const handleAddTodo = (task: string) => {
        localStorage.setItem("Todos", JSON.stringify([{
            id: Math.random().toString(),
            task,
            isCompleted: false,
            createdAt: new Date()
        }, ...todos]))


        setTodos(() => {
            const newTodos: Todo[] = [{
                id: Math.random().toString(),
                task,
                isCompleted: false,
                createdAt: new Date()
            }, ...todos]
            return newTodos
        })
    }

    const handleEdit = (id: string) => {
        setTodos(todos.filter((todo) => todo.id != id))
    }
    const handleDelete = (id: string) => {
        const user = confirm("Are You Sure You Want To Delete It?")
        if (user) {
            setTodos(todos.filter((todo) => todo.id != id))
            localStorage.setItem("Todos", JSON.stringify(todos.filter((todo) => todo.id != id)))
        }
    }

    const handleChecked = (id: string) => {
        setTodos(() => {
            const newTodos = parsedData.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isCompleted: !todo.isCompleted }
                }
                return todo
            })
            localStorage.setItem("Todos", JSON.stringify(newTodos))
            return newTodos
        })
    }
    return (
        <todosContext.Provider value={{ todos, handleAddTodo, setTodos, handleChecked, handleDelete, setTodoText, todoText, handleEdit }}>
            {children}
        </todosContext.Provider >
    )
}


// Custom Hook

export const useTodos = () => {
    const todosContextValue = useContext(todosContext)
    if (!todosContextValue) {
        throw new Error('UseTodos used outside of Provider')
    }
    return todosContextValue
}