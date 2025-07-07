'use client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-bold">
                        <li><a
                            onClick={() => router.push("/")}
                            className={pathname === '/' ? 'bg-gray-200 text-black' : ''}>Home</a></li>
                        {/* <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li> */}
                        <li><a
                            onClick={() => router.push("/example")}
                            className={pathname === '/example' ? 'bg-gray-200 text-black' : ''}>Example</a></li>
                        <li><a
                            onClick={() => router.push("/todoList")}
                            className={pathname === '/todoList' ? 'bg-gray-200 text-black' : ''}>Todo</a></li>
                    </ul>
                </div>
                <a
                    onClick={() => router.push("/")}
                    className="text-xl font-bold cursor-pointer mx-5"
                >
                    MyLogo
                </a>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-bold gap-3">
                    <li><a
                        onClick={() => router.push("/")}
                        className={pathname === '/' ? 'bg-gray-200 text-black' : ''}>Home</a></li>
                    {/* <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li> */}
                    <li><a
                        onClick={() => router.push("/example")}
                        className={pathname === '/example' ? 'bg-gray-200 text-black' : ''}>Example</a></li>
                    <li><a
                        onClick={() => router.push("/todoList")}
                        className={pathname === '/todoList' ? 'bg-gray-200 text-black' : ''}>Todo</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                {/* <a className="btn">Button</a> */}
            </div>
        </div>
    )
}