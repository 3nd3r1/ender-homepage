import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiDark, CiLight } from "react-icons/ci";

const ThemeSwitch = () => {
	const [theme, setTheme] = useState<string | null>(null);

	useEffect(() => {
		if (localStorage.getItem("color-theme") !== null) {
			setTheme(localStorage.getItem("color-theme"));
		}
	}, []);

	useEffect(() => {
		if (theme == null) {
			return;
		}

		localStorage.setItem("color-theme", theme);
		if (theme == "dark") {
			document.documentElement.classList.add("dark");
		} else if (document.documentElement.classList.contains("dark")) {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<AnimatePresence mode="wait" initial={false}>
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
					onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
				>
					{theme == "dark" ? <CiLight /> : <CiDark />}
				</button>
			</motion.div>
		</AnimatePresence>
	);
};

export default ThemeSwitch;
