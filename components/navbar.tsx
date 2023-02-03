import Link from "next/link";
import Logo from "./logo";
import ThemeSwitch from "./themeSwitch";
import { AiFillGithub } from "react-icons/ai";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LinkComp = ({ text, url, path }: any) => {
	const active = path === url;
	return (
		<Link key={text} href={url}>
			<p
				className={`font-term text-lg relative mb-2 mx-2 hover:before:content-['>_'] before:absolute before:left-[-15px] ${
					active ? "before:content-['>_']" : ""
				}`}
			>
				{text}
			</p>
		</Link>
	);
};

const Navbar = ({ path }: any) => {
	return (
		<motion.div
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.2 }}
		>
			<nav className="max-w-6xl mx-auto">
				<div className=" flex flex-wrap max-w-4xl ml-5 py-4 justify-between">
					<div className="flex flex-row ml-5 flex-grow gap-6">
						<div className="grow max-w-xs">
							<Logo path={path} />
						</div>
						<div className="flex flex-row gap-3 align-middle items-center">
							<LinkComp path={path} text="Works" url="/works" />
							<LinkComp
								path={path}
								text="Achievements"
								url="/achievements"
							/>
							<Link
								target="_blank"
								href="https://github.com/3nd3r1/ender-homepage"
								className="flex flex-row items-center mb-2 gap-1"
							>
								<AiFillGithub />
								Source
							</Link>
						</div>
					</div>
					<div>
						<ThemeSwitch />
					</div>
				</div>
			</nav>
		</motion.div>
	);
};

export default Navbar;
