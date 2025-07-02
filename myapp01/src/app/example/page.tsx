'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <header className="bg-green-400 p-5 text-xl text-white text-center font-bold">Header</header>

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
          <div className='flex flex-row justify-center mt-4 space-x-4'>
            <button
              onClick={() => router.push('/')}
              className='p-3 bg-amber-50 text-black rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-amber-100'>Back Home</button>
            <button
              onClick={() => router.push('/todoList')}
              className='p-3 bg-amber-50 text-black rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-amber-100'>To do list</button>
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
