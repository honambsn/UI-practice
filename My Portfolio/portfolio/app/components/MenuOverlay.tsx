import React from "react";
import NavLink from "./NavLink";

type LinkType = {
  title: string;
  path: string;
};

type MenuProps = {
  links: LinkType[];
  isOpen: boolean;
};

const MenuOverlay = ({links, isOpen} : MenuProps) => {
    return (
        <div className={`
      md:hidden absolute top-full left-0 w-full
      bg-black/90 backdrop-blur-md
      transform transition-transform duration-300 ease-out
      ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
      `}
    >
      <ul className="flex flex-col py-4 items-center">
            {links.map((link, index) => (
                <li key={index} className="relative group py-2">
                    <NavLink href={link.path} title = {link.title} />
                </li>
            ))}

            {/* <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#DE3163] transition-all duration-300 group-hover:w-full"></span> */}
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#DE3163] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </ul>
    </div>
    );
};

export default MenuOverlay;

