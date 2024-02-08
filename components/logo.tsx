import Link from "next/link";
import React from "react";

const Logo = (props: any) => {
	const { path } = props;
	return (
		<Link href="/">
			<div className="flex flex-row items-center align-middle gap-1 font-term text-lg font-bold">
				<span className="text-purple-500">viljamiranta</span>
                <span className="text-fuchsia-900">@</span>
                <span className="text-orange-500">mysite</span>
                <span>:</span>
				<span className="text-purple-500">~{path}</span>$
			</div>
		</Link>
	);
};

export default Logo;
