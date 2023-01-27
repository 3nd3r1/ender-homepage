import Link from "next/link";
import React from "react";

const Logo = (props: any) => {
	const { path } = props;
	return (
		<Link href="/">
			<span className="flex flex-row items-center align-middle gap-1 group font-term text-lg font-bold">
				<p>
					{"viljamiranta@mysite:"}
					<span className="text-purple-500">
						{"~"}
						{path}
					</span>
					{"$"}
				</p>
			</span>
		</Link>
	);
};

export default Logo;
