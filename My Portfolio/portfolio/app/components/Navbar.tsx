"use client";
import React from "react";
import Link from "next/link";
import NavLink from "./NavLink";


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
    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between mx-auto p-8">
                <Link href="/" className="text-2xl md:text-5xl text-white font-semibold transition-all duration-200 hover:scale-105">Logo</Link>

                <div className="menu block md:w-auto" id="navbar">
                    <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
                        {navLinks.map((link, index) =>  (
                            <li key={index} className="relative group">
                                <NavLink href={link.path} title={link.title}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

//https://youtu.be/Kb1f5bvF6f4?list=PLaYsth8JnnBRRuHargaQ3o7md60bOTNak&t=2029