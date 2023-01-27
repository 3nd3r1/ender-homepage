import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiDark, CiLight } from "react-icons/ci";

const ThemeSwitch = () => {
	const [theme, setTheme] = useState("dark");
	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<motion.div
				className="inline-block"
				key={theme}
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 20, opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				<button
					className="p-2 dark:bg-amber-200 bg-purple-500 dark:text-black text-lg rounded-lg dark:hover:bg-amber-300 hover:bg-purple-400 text-white transition-colors duration-200 ease-in-out"
					onClick={() => {
						if (
							document.documentElement.classList.contains("dark")
						) {
							setTheme("light");
							document.documentElement.classList.remove("dark");
							localStorage.setItem("color-theme", "light");
						} else {
							setTheme("dark");
							document.documentElement.classList.add("dark");
							localStorage.setItem("color-theme", "dark");
						}
					}}
				>
					{theme == "dark" ? <CiLight /> : <CiDark />}
				</button>
			</motion.div>
		</AnimatePresence>
	);
};

export default ThemeSwitch;
