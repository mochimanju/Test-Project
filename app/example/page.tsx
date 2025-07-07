'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Navbar from '@/components/ui/navbar'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <Navbar/>

      <div className="flex flex-1 gap-4">
        <aside className="bg-red-300 p-4 w-1/4 text-white text-center font-bold">
          Sidebar
          <Image
            src="/kitty.jpg"
            alt="Example"
            width={200}
            height={200}
            className="mt-4 mx-auto rounded-lg shadow-md"
          />
          <h1 className="mt-4">Hello, World!!</h1>
          <div className='flex flex-col justify-center mt-4 space-y-4 px-15'>
            <Button
              onClick={() => router.push('/todoList')}
              className="p-6 rounded-full cursor-pointer font-bold">Todo List</Button>
            <Button
              onClick={() => router.push('/')}
              className="p-6 rounded-full cursor-pointer font-bold">Back to Home</Button>
          </div>

        </aside>
        <main className="bg-blue-200 p-4 flex-1 text-center text-white font-bold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
          facilisis quam, nec consectetur urna. Aliquam elementum nibh metus,
          eget lobortis lacus aliquet eu.
        </main>
      </div>

      <div className="bg-pink-300 p-4 text-white text-center font-bold">Footer</div>
    </div>
  )
}
