"use client";
import React, {useState} from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";


const navLinks = [
    {
        title: "About",
        path: "#about"
    },
    {
        title: "Projects",
        path: "#projects"
    },
    {
        title: "Contact",
        path: "#contact"
    },
    {
        title: "Certification",
        path: "#certification"
    },
];

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav className="fixed ms-auto border border-[#33353f] top-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-md">
            <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
                <Link href="/" className="text-2xl md:text-5xl text-white font-semibold transition-all duration-200 hover:scale-105">Logo</Link>

                <div className="mobile-menu block md:hidden">
                    {
                        !navbarOpen ? (
                            <button onClick={() => setNavbarOpen(true)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white hover:cursor-pointer">
                                <Bars3Icon className="h-5 w-5 transition-all duration-200 hover:scale-105 hover:text-[#AA336A]"/>
                            </button>
                        ) : (
                            <button onClick={() => setNavbarOpen(false)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white hover:cursor-pointer">
                                <XMarkIcon className="h-5 w-5 transition-all duration-200 hover:scale-105 hover:text-[#AA336A]"/>
                            </button>
                        )
                    }
                </div>

                <div className="menu hidden md:block md:w-auto" id="navbar">
                    <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
                        {navLinks.map((link, index) =>  (
                            <li key={index} className="relative group">
                                <NavLink href={link.path} title={link.title}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* {navbarOpen ? <MenuOverlay links={navLinks} /> : null} */}
            <MenuOverlay links={navLinks} isOpen={navbarOpen} />
        </nav>
    )
}

export default Navbar;

