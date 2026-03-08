import Link from "next/link";

type NavLinkProps = {
    href: string;
    title: string
};

const NavLink = ({href, title} : NavLinkProps) => {
    return (
        <>
            <Link href={href} 
                className="block py-2 pl-3 pr-4 text-[#adb7be] sm:text-xl rounded md:p-0 transition-all duration-200 hover:text-[#DE3163] hover:scale-105">
                {title}
            </Link>

            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#DE3163] transition-all duration-300 group-hover:w-full"></span>
        </>

    );
    
};

export default NavLink;
