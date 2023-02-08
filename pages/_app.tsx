import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import Layout from "../components/layouts/main";

import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function Website({ Component, pageProps, router }: AppProps) {
	const [isEnderized, setIsEnderized] = useState<boolean>(false);
	const [completedAchievements, setCompletedAchievements] = useState<
		Number[]
	>([]);

	const completeAchievement = (id: Number) => {
		if (completedAchievements.indexOf(id) === -1) {
			setCompletedAchievements(completedAchievements.concat(id));
		}
	};

	useEffect(() => {
		const data = localStorage.getItem("completed-achievements");
		setCompletedAchievements(data ? data.split(";").map(Number) : []);
	}, []);

	useEffect(() => {
		localStorage.setItem(
			"completed-achievements",
			completedAchievements.join(";")
		);
	}, [completedAchievements]);

	return (
		<ThemeProvider enableSystem={true} attribute="class">
			<Layout router={router} completeAchievement={completeAchievement}>
				<AnimatePresence initial={true} mode="wait">
					<Component
						{...pageProps}
						completeAchievement={completeAchievement}
						completedAchievements={completedAchievements}
						key={router.route}
					/>
				</AnimatePresence>
			</Layout>
		</ThemeProvider>
	);
}

export default Website;
