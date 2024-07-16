import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import Layout from "../components/layouts/main";

import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";

function Website({ Component, pageProps, router }: AppProps) {
    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <AnimatePresence mode="wait" initial={true}>
                <Layout router={router}>
                    <Component {...pageProps} key={router.route} />
                </Layout>
            </AnimatePresence>
        </ThemeProvider>
    );
}

export default Website;
