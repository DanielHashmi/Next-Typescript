"use client"
import Link from 'next/link'

interface paramType {
    params: string | null;
}

const SwitchNav = ({ params }: paramType) => {
    return (
        <div className='flex gap-24 font-bold'>
            <Link href="/" className={`cursor-pointer hover:text-gray-400 text-gray-500 ${params === null && "text-white"}`}>All</Link>

            <Link href="/?params=active" className={`cursor-pointer hover:text-gray-400 text-gray-500 ${params === "active" && "text-white"}`}>Active</Link>

            < Link href="/?params=completed" className={`cursor-pointer hover:text-gray-400 text-gray-500 ${params === "completed" && "text-white"}`}>Completed</Link>
        </div >
    )
}

export default SwitchNav