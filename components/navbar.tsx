import Link from "next/link";
import Logo from "./logo";

import ThemeSwitch from "./themeSwitch";
import { useEffect, useState } from "react";

const TriangleLeft = () => (
    <div className="w-0 h-0 pr-1 border-l-stone-100 dark:border-l-black border-t-[11.5px] border-t-transparent border-b-[11.5px] border-b-transparent border-l-[11.5px]"></div>
);
const TriangleRight = () => (
    <div className="w-0 h-0 pl-1 border-l-purple-500 dark:border-l-purple-700 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[12px]"></div>
);

const LinkComp = ({ text, url, path }: any) => {
    const active = path === url;
    return (
        <Link key={text} href={url} scroll={false}>
            <div
                className={`flex flex-row items-center align-middle font-bold ${active ? "px-0" : "px-4"}`}
            >
                <div
                    className={`flex flex-row items-center ${active ? "bg-purple-500 dark:bg-purple-700" : ""} gap-0 m-0 p-0`}
                >
                    {active ? <TriangleLeft /> : ""}
                    {text}
                </div>
                {active ? <TriangleRight /> : ""}
            </div>
        </Link>
    );
};

const Navbar = ({ path }: any) => {
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
                className={`w-full px-4 ${!isOnTop ? "bg-stone-100 dark:bg-black" : ""}`}
            >
                <div className="flex flex-wrap max-w-6xl mx-auto justify-around items-center">
                    <div className="w-1/3">
                        <div className="hidden md:block">
                            <Logo path={path} />
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
                        <LinkComp path={path} text="Works" url="/works" />
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
