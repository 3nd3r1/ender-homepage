import Head from "next/head";
import Navbar from "../navbar";

import { useEffect, useState } from "react";

const Main = ({ children, router }: any) => {
	const [name, setName] = useState("viljamiranta");

	useEffect(() => {
		if (window.location.host === "ender.fi") {
			setName("ender");
		}
	}, []);
	return (
		<div>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="description" content="Viljami's site" />
				<meta name="author" content="Viljami Ranta" />
				<meta name="author" content="ender" />
				<link
					rel="apple-touch-icon"
					href="/images/apple-touch-icon.png"
				/>
				<link
					rel="shortcut icon"
					href="/images/favicon/favicon.ico"
					type="image/x-icon"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@enderguru" />
				<meta name="twitter:creator" content="@enderguru" />
				<meta name="twitter:image" content="" />
				<meta property="og:site_name" content="Viljami Ranta" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="" />
			</Head>
			<Navbar name={name} path={"/" + router.asPath.split("/")[1]} />
			<main className="">
				<div className="mx-auto max-w-4xl py-10">{children}</div>
			</main>
		</div>
	);
};

export default Main;
