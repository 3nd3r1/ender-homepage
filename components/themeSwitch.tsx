import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiDark, CiLight } from "react-icons/ci";

const ThemeSwitch = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

	useEffect(() => {
		if (localStorage.getItem("dark-mode") === "0") {
			setIsDarkTheme(false);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("dark-mode", isDarkTheme ? "1" : "0");
		if (isDarkTheme) {
			document.documentElement.classList.add("dark");
		} else if (document.documentElement.classList.contains("dark")) {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkTheme]);

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				className="inline-block"
				key={isDarkTheme ? "dark" : "light"}
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 20, opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				<button
					className="p-2 dark:bg-amber-200 bg-purple-500 dark:text-black text-lg rounded-lg dark:hover:bg-amber-300 hover:bg-purple-400 text-white transition-colors duration-200 ease-in-out"
					onClick={() => setIsDarkTheme(!isDarkTheme)}
				>
					{isDarkTheme ? <CiLight /> : <CiDark />}
				</button>
			</motion.div>
		</AnimatePresence>
	);
};

export default ThemeSwitch;
