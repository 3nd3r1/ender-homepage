import Link from "next/link";
import Logo from "./logo";
import ThemeSwitch from "./themeSwitch";
import { AiFillGithub } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

const LinkComp = ({ text, url, path }: any) => {
	const active = path === url;
	return (
		<Link key={text} href={url}>
			<p
				className={`font-term text-lg relative mb-2 hover:before:content-['>_'] before:absolute before:left-[-15px] ${
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
			<nav className="w-100 px-4">
				<div className=" flex flex-wrap max-w-4xl mx-auto py-4 justify-between items-center">
					<div className="flex flex-row flex-grow">
						<div className="grow max-w-xs">
							<div className="hidden md:block">
								<Logo path={path} />
							</div>
							<div className="block md:hidden">
								<Link href="/">
									<h2 className="font-term text-xl font-bold">
										Viljami
									</h2>
								</Link>
							</div>
						</div>
						<div className="flex-row gap-2 align-middle items-center flex">
							<LinkComp path={path} text="Works" url="/works" />
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
					<div className="px-4">
						<ThemeSwitch />
					</div>
				</div>
			</nav>
		</motion.div>
	);
};

export default Navbar;
