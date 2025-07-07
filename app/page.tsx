'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-10">
      <header className="text-7xl font-bold">Hello, I’m Kim Bibi :)</header>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button 
        onClick={() => router.push('/example')}
        className="p-6 rounded-full cursor-pointer">Welcome</Button>
      </div>
    </div>
  )
}
