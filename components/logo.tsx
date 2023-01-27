import Link from "next/link";
import React from "react";

const Logo = (props: any) => {
	const { path, name } = props;
	return (
		<Link href="/">
			<div className="flex flex-row items-center align-middle gap-1 group font-term text-lg font-bold">
				<p>
					{`${name}@mysite:`}
					<span className="text-purple-500">
						{"~"}
						{path}
					</span>
					{"$"}
				</p>
			</div>
		</Link>
	);
};

export default Logo;
