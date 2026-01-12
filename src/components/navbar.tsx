"use client";

import Link from "next/link";
import Logo from "./logo";

import ThemeSwitch from "./theme-switch";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavLink = ({
    text,
    url,
    pathname,
}: {
    text: string;
    url: string;
    pathname: string;
}) => {
    const active = "/" + pathname.split("/")[1] === url;
    return (
        <Link key={text} href={url} scroll={false}>
            <div
                className={`flex flex-row items-center align-middle font-bold transition-all duration-300 ease-in-out ${active ? "px-0" : "px-4"}`}
            >
                <div
                    className={`flex flex-row transition-all duration-300 ease-in-out items-center ${active ? "bg-purple-500 dark:bg-purple-700" : "bg-transparent"} gap-0 m-0 p-0`}
                >
                    <div
                        className={`w-0 h-0 pr-1 border-l-white dark:border-l-black border-t-[11.5px] border-t-transparent border-b-[11.5px] border-b-transparent border-l-[11.5px] ${active ? "opacity-100 transition-none" : "opacity-0 transition-opacity duration-300 delay-300 ease-in-out"}`}
                    />
                    <span>{text}</span>
                </div>
                <div
                    className={`w-0 h-0 pl-1 transition-all duration-300 ease-in-out border-l-purple-500 dark:border-l-purple-700 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[12px] ${active ? "opacity-100" : "opacity-0"}`}
                />
            </div>
        </Link>
    );
};

const Navbar = () => {
    const pathname = usePathname();
    const [isOnTop, setIsOnTop] = useState(true);

    useEffect(() => {
        if (window.scrollY > 0) {
            setIsOnTop(false);
        }

        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setIsOnTop(false);
            } else {
                setIsOnTop(true);
            }
        });
    }, []);

    return (
        <header className="fixed w-screen z-50">
            <nav
                className={`w-full transition-[background-color] ease-in-out duration-300 px-4 ${!isOnTop ? "bg-white dark:bg-black" : ""}`}
            >
                <div className="flex flex-wrap max-w-6xl mx-auto justify-around items-center">
                    <div className="w-1/3">
                        <div className="hidden md:block">
                            <Logo pathname={pathname} />
                        </div>
                        <div className="block md:hidden">
                            <Link href="/" scroll={false}>
                                <h2 className="font-term text-xl font-bold">
                                    Viljami
                                </h2>
                            </Link>
                        </div>
                    </div>
                    <div className="w-1/3 flex justify-center ">
                        <NavLink
                            pathname={pathname}
                            text="Works"
                            url="/works"
                        />
                        <NavLink
                            pathname={pathname}
                            text="Blog"
                            url="/blog"
                        />
                    </div>
                    <div className="w-1/3 flex justify-center">
                        <ThemeSwitch />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
