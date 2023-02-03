import React from "react";

import Layout from "../components/layouts/content";

import { AiFillLock } from "react-icons/ai";
import { MdDarkMode, MdWork } from "react-icons/md";
import { GiTechnoHeart } from "react-icons/gi";

const AchievementEntry = ({ title, desc, icon, owned }: any) => (
	<div className="dark: bg-neutral-800 shadow-md hover:shadow-lg rounded-md flex flex-row px-2 py-1 h-16">
		<div className="flex place-items-center">
			<div
				className={`dark:bg-neutral-900 ${
					owned ? "" : "dark: text-neutral-500"
				} rounded-full w-12 h-12 text-4xl flex place-items-center justify-center mr-2`}
			>
				{owned ? icon : <AiFillLock />}
			</div>
		</div>
		<div
			className={`${owned ? "dark:text-white" : "dark:text-neutral-400"}`}
		>
			<h2 className="text-md font-bold">{title}</h2>
			<p className="text-xs">{owned ? desc : "??????"}</p>
		</div>
	</div>
);

const Achievements = ({ completedAchievements }: any) => {
	const achievements = [
		{
			id: 1,
			title: "The Darkside",
			desc: "Re-enable dark theme after enabling light theme.",
			icon: <MdDarkMode />,
		},
		{
			id: 2,
			title: "Workaholic",
			desc: "Open every work in my portfolio.",
			icon: <MdWork />,
		},
		{
			id: 3,
			title: "Engineer at Heart",
			desc: "Visit this pages GitHub repo.",
			icon: <GiTechnoHeart />,
		},
	];

	return (
		<Layout title="Achievements">
			<h1 className="font-bold text-xl mb-4">Achievements</h1>
			<div className="grid grid-cols-2 gap-4">
				{achievements.map((achievement) => (
					<AchievementEntry
						title={achievement.title}
						desc={achievement.desc}
						icon={achievement.icon}
						owned={
							completedAchievements.indexOf(achievement.id) == -1
						}
					/>
				))}
			</div>
		</Layout>
	);
};

export default Achievements;
