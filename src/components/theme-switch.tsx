"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CiDark, CiLight } from "react-icons/ci";

import { AnimatePresence, motion } from "framer-motion";

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="p-[17px] dark:bg-orange-500 bg-purple-500 dark:text-black text-lg dark:hover:bg-orange-600 hover:bg-purple-400 text-white transition-colors duration-200 ease-in-out"></div>
        );
    }

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                className="inline-block"
                key={resolvedTheme}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <button
                    className="p-2 dark:bg-orange-500 bg-purple-500 dark:text-black text-lg dark:hover:bg-orange-600 hover:bg-purple-400 text-white transition-colors duration-200 ease-in-out"
                    onClick={() =>
                        setTheme(resolvedTheme === "light" ? "dark" : "light")
                    }
                >
                    {resolvedTheme === "dark" ? <CiLight /> : <CiDark />}
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default ThemeSwitch;
