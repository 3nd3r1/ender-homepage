import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import Layout from "../components/layouts/main";

import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

function Website({ Component, pageProps, router }: AppProps) {
	const [isEnderized, setIsEnderized] = useState(false);
	const [completedAchievements, setCompletedAchievements] = useState<
		Number[]
	>([]);

	const completeAchievement = (id: Number) => {
		setCompletedAchievements(completedAchievements.concat(id));
	};

	return (
		<ThemeProvider enableSystem={true} attribute="class">
			<Layout router={router}>
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
