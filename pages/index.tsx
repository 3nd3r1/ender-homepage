import Image from "next/image";
import Link from "next/link";

import {
	AiFillGithub,
	AiFillLinkedin,
	AiFillTwitterCircle,
} from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

import { SiLeetcode } from "react-icons/si";

import Layout from "../components/layouts/content";

const BioEntry = ({ children, year }: any) => (
	<div className="pl-[3.4em] indent-[-3.4em]">
		<span className="mr-4 font-bold">{year}</span>
		{children}
	</div>
);

const SocialEntry = ({ text, link, icon }: any) => (
	<li className="flex flex-row items-center text-xl gap-2 align-middle dark:text-purple-600 text-purple-700">
		{icon}
		<Link className="mb-1" target="_blank" href={link}>
			{text}
		</Link>
	</li>
);

const Home = () => {
	return (
		<Layout title="Home">
			<div className="flex flex-col gap-8 home-page-content">
				<div className="flex flex-col-reverse md:flex-row gap-10 justify-between items-center ">
					<div>
						<h1 className="text-5xl">Viljami Ranta</h1>
						<p className="text-lg">Software Engineer</p>
					</div>
					<div className="relative w-40 h-40">
						<span className="absolute rounded-full border-white border-2 w-full h-full shadow-md">
							<Image
								src="/images/me.JPG"
								alt="Söpö meitsi"
								fill
								className="rounded-full object-cover"
							/>
						</span>
					</div>
				</div>
				<div>
					<h1 className="main-heading">Work</h1>
					<div className="py-4">
						<p className="indent-4">
							I am a 21-year-old software engineer from Helsinki.
							I got my first computer at 10 years old, after which
							I haven't been able to stop programming. Whether it
							be competetive programming with c++, modern web
							development with javascript, game development with
							java or linux server administration, there isn't
							much I haven't tried.
						</p>
						<p className="indent-4">
							Currently, I am most comfortable and proficient in
							Python and TypeScript, and I am excited to leverage
							these skills to contribute effectively as a software
							engineer.
						</p>
						<div className="flex justify-center mt-6">
							<Link
								className="!text-black bg-purple-600 hover:bg-purple-700 rounded-md py-2 px-4 text-lg font-bold flex flex-row items-center gap-2 transition-colors duration-200 ease-in-out"
								href="/works"
							>
								My Portfolio
								<IoIosArrowForward className="text-sm" />
							</Link>
						</div>
					</div>
				</div>
				<div>
					<h1 className="main-heading">Bio</h1>
					<div className="flex flex-col py-4">
						<BioEntry year="2002">
							Born in Helsinki, Finland.
						</BioEntry>
						<BioEntry year="2021">
							Completed High School at the{" "}
							<Link href="https://hrsk.fi" target="_blank">
								French-Finnish school of Helsinki
							</Link>
						</BioEntry>
						<BioEntry year="2022">
							Started studying Computer Science at the{" "}
							<Link href="https://helsinki.fi" target="_blank">
								University of Helsinki
							</Link>
						</BioEntry>
						<BioEntry year="2022">
							Taught programming at{" "}
							<Link href="https://kodarit.fi" target="_blank">
								Kodarit
							</Link>
						</BioEntry>
						<BioEntry year="2023">
							Founded{" "}
							<Link href="https://vebbi.fi" target="_blank">
								Vebbi
							</Link>
						</BioEntry>
						<BioEntry year="2024">
							Software Engineer Trainee at{" "}
							<Link href="https://ericsson.com" target="_blank">
								Ericsson
							</Link>
						</BioEntry>
					</div>
				</div>
				<div>
					<h1 className="main-heading">Socials</h1>
					<ul className="py-4 px-4">
						<SocialEntry
							text="github.com/3nd3r1"
							link="https://github.com/3nd3r1"
							icon={<AiFillGithub />}
						/>
						<SocialEntry
							text="@enderguru"
							link="https://twitter.com/enderguru"
							icon={<AiFillTwitterCircle />}
						/>
						<SocialEntry
							text="linkedin.com/in/viljami-ranta"
							link="https://www.linkedin.com/in/viljami-ranta/"
							icon={<AiFillLinkedin />}
						/>
						<SocialEntry
							text="leetcode.com/3nd3r1"
							link="https://leetcode.com/3nd3r1/"
							icon={<SiLeetcode />}
						/>
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
