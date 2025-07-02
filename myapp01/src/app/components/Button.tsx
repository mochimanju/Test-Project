'use client'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push('/example')}
            className="bg-pink-300 px-4 py-3 font-bold rounded-full hover:bg-pink-200 text-white shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >   
            welcome
        </button>
    )
}
