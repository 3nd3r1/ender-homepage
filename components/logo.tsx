import Link from "next/link";
import React from "react";

const Logo = (props: any) => {
	const { path } = props;
	return (
		<Link href="/">
			<div className="flex flex-row items-center align-middle gap-1 font-term text-lg font-bold">
				viljamiranta@mysite:
				<span className="text-purple-500">~{path}</span>$
			</div>
		</Link>
	);
};

export default Logo;
