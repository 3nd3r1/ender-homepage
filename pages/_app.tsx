import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import Layout from "../components/layouts/main";

import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";

function Website({ Component, pageProps, router }: AppProps) {
	return (
		<ThemeProvider enableSystem={true} attribute="class">
			<Layout router={router}>
				<AnimatePresence
					initial={true}
					exitBeforeEnter
					onExitComplete={() => {
						if (typeof window !== "undefined") {
							window.scrollTo({ top: 0 });
						}
					}}
				>
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
			</Layout>
		</ThemeProvider>
	);
}

export default Website;
