import Link from "next/link";
import Logo from "./logo";
import ThemeSwitch from "./themeSwitch";

const LinkComp = ({ text, url, path }: any) => {
	return (
		<Link key={text} href={url}>
			<p
				className={`font-term text-lg after:h-5 after:w-2.5 dark:after:hover:bg-white  after:hover:bg-slate-900 after:inline-block after:align-middle after:animate-cursor-blink relative mb-2 ${
					path == url
						? "before:content-['>_'] before:absolute before:left-[-15px]"
						: ""
				}`}
			>
				{text}
			</p>
		</Link>
	);
};

const Navbar = ({ path }: any) => {
	return (
		<nav className="w-100">
			<div className=" flex flex-wrap max-w-4xl mx-auto py-4 justify-between">
				<div className="flex flex-row ml-5 flex-grow">
					<div className="grow max-w-xs">
						<Logo path={path} />
					</div>
					<div className="flex align-middle items-center">
						<LinkComp path={path} text="Works" url="/works" />
					</div>
				</div>
				<div>
					<ThemeSwitch />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
