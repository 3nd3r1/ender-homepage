import Head from "next/head";
import Navbar from "../navbar";

const Main = ({ children, router, completeAchievement }: any) => {
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
					sizes="57x57"
					href="/apple-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/apple-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/apple-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/apple-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/apple-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/apple-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-icon-180x180.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/manifest.json" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta
					name="msapplication-TileImage"
					content="/ms-icon-144x144.png"
				/>
				<meta name="theme-color" content="#ffffff" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@enderguru" />
				<meta name="twitter:creator" content="@enderguru" />
				<meta name="twitter:image" content="" />
				<meta property="og:site_name" content="Viljami Ranta" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="" />
			</Head>
			<Navbar
				path={"/" + router.asPath.split("/")[1]}
				completeAchievement={completeAchievement}
			/>
			<main className="">
				<div className="mx-auto max-w-4xl py-10">{children}</div>
			</main>
		</div>
	);
};

export default Main;
