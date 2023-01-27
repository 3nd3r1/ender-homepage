import Head from "next/head";
import React from "react";
import { motion } from "framer-motion";

const variants = {
	hidden: { opacity: 0, x: 0, y: 20 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: 20 },
};

const Content = ({ children, title }: any) => {
	const tit = `Viljami Ranta - ${title ? title : "Home"}`;

	return (
		<motion.article
			className="mx-auto max-w-lg font-term"
			initial="hidden"
			animate="enter"
			exit="exit"
			variants={variants}
			transition={{ duration: 0.4, type: "easeInOut" }}
		>
			<Head>
				<title>{tit}</title>
				<meta name="twitter:title" content={tit} />
				<meta property="og:title" content={tit} />
			</Head>
			<div className="flex flex-col">{children}</div>
		</motion.article>
	);
};

export default Content;
