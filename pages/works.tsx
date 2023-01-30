import React from "react";
import Image from "next/image";

import Layout from "../components/layouts/content";
import Link from "next/link";

import defaultImage from "../public/images/default-image.jpg";

import { getWorks } from "../services";

const WorkEntry = ({ work }: any) => (
	<Link href={"/works/" + work.slug}>
		<div className="flex flex-col rounded-lg w-60 h-56 gap-1">
			<Image
				src={work.image ? work.image.url : defaultImage}
				alt={work.title}
				width={1000}
				height={1000}
				className="rounded-xl h-32 w-auto object-cover"
			/>
			<h3 className="w-100 text-center text-xl mt-2">{work.title}</h3>
			<p className="text-sm text-center">{work.description}</p>
		</div>
	</Link>
);

const Works = ({ works }: any) => {
	return (
		<Layout title="Works">
			<h1 className="font-bold text-xl">Works</h1>
			<div className="grid grid-cols-2 py-4 justify-items-center gap-8">
				{works.map((work: any) => (
					<WorkEntry key={work.node.title} work={work.node} />
				))}
			</div>
		</Layout>
	);
};

export function getStaticProps() {
	return getWorks()
		.then((works) => {
			return {
				props: { works },
			};
		})
		.catch((error) => console.log(error));
}

export default Works;
