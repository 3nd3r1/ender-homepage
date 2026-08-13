import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
    AiFillGithub,
    AiFillLinkedin,
    AiFillTwitterCircle,
    AiOutlineMail,
} from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

import { SiLeetcode } from "react-icons/si";

const MainHeading = ({ text }: { text: string }) => (
    <h1 className="underline underline-offset-8 decoration-gray-600 decoration-4 text-2xl before:content-['>_']">
        {text}
    </h1>
);
const BioEntry = ({
    children,
    year,
}: {
    children: React.ReactNode;
    year: string;
}) => (
    <div className="pl-[3.4em] indent-[-3.4em]">
        <span className="mr-4 font-bold">{year}</span>
        {children}
    </div>
);

const SocialEntry = ({
    text,
    link,
    icon,
}: {
    text: string;
    link: string;
    icon: React.ReactNode;
}) => (
    <li className="flex flex-row items-center text-xl gap-2 align-middle dark:text-purple-600 text-purple-700">
        {icon}
        <Link className="mb-1" target="_blank" href={link}>
            {text}
        </Link>
    </li>
);

const HomePage = () => {
    return (
        <>
            <div className="page-content flex flex-col gap-8">
                <div className="flex flex-col-reverse md:flex-row gap-10 justify-between items-center">
                    <div>
                        <h1 className="text-5xl">Viljami Ranta</h1>
                        <div className="flex flex-row items-center">
                            <p className="text-lg">Software Engineer</p>
                            <span className="bg-slate-900 dark:bg-white w-2 h-6 animate-cursor-blink"></span>
                        </div>
                    </div>
                    <div className="relative w-40 h-40">
                        <span className="absolute rounded-full border-white border-2 w-full h-full shadow-md">
                            <Image
                                src="/images/me2.jpg"
                                alt="Picture of Viljami Ranta"
                                fill
                                className="rounded-full object-cover"
                            />
                        </span>
                    </div>
                </div>
                <div>
                    <MainHeading text="About Me" />
                    <div className="py-4">
                        <p className="indent-4">
                            I&apos;m an incoming software engineer at{" "}
                            <Link href="https://palantir.com" target="_blank">
                                Palantir
                            </Link>
                            , starting June 2027, based in London, UK.
                            <br />
                            <br />
                            I have experience in databases, backup
                            orchestration, and making cloud native systems more
                            reliable at scale.
                            <br />
                            <br />
                            Currently exploring ML infrastructure, GPU
                            scheduling, and distributed training systems.
                        </p>
                        <div className="flex justify-center mt-6">
                            <Link
                                className="!text-black !dark:text-white bg-purple-500 dark:bg-purple-800 hover:bg-purple-400 dark:hover:bg-purple-900 rounded-none py-2 px-4 text-lg font-bold flex flex-row items-center gap-2 transition-colors duration-200 ease-in-out"
                                href="/works"
                                scroll={false}
                            >
                                My Works
                                <IoIosArrowForward className="text-sm" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <MainHeading text="I Like" />
                    <div className="py-4">
                        <p className="indent-4">
                            Distributed Systems, Kubernetes, Go, PostgreSQL,
                            <Link
                                href="https://dotfiles.ender.fi"
                                target="_blank"
                            >
                                {" "}
                                Linux, Nix, Vim, Tiling Window Managers
                            </Link>
                        </p>
                    </div>
                </div>
                <div>
                    <MainHeading text="Bio" />
                    <div className="flex flex-col py-4">
                        <BioEntry year="2002">
                            Born in Helsinki, Finland
                        </BioEntry>
                        <BioEntry year="2021">
                            Completed High School at the{" "}
                            <Link href="https://hrsk.fi" target="_blank">
                                French-Finnish school of Helsinki
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
                        <BioEntry year="2025">
                            BSc in Computer Science at the{" "}
                            <Link href="https://helsinki.fi" target="_blank">
                                University of Helsinki
                            </Link>
                        </BioEntry>
                        <BioEntry year="2026">
                            Software Engineer Intern at{" "}
                            <Link href="https://palantir.com" target="_blank">
                                Palantir
                            </Link>
                        </BioEntry>
                        <BioEntry year="2027">
                            MSc in Computer Science at the{" "}
                            <Link href="https://helsinki.fi" target="_blank">
                                University of Helsinki
                            </Link>
                        </BioEntry>
                        <BioEntry year="2027">
                            Incoming Software Engineer at{" "}
                            <Link href="https://palantir.com" target="_blank">
                                Palantir
                            </Link>
                        </BioEntry>
                    </div>
                </div>
                <div>
                    <MainHeading text="Socials" />
                    <ul className="py-4 px-4">
                        <SocialEntry
                            text="ranta.viljami@gmail.com"
                            link="mailto:ranta.viljami@gmail.com"
                            icon={<AiOutlineMail />}
                        />
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
            <footer className="mt-12 flex justify-center">
                <Link
                    target="_blank"
                    href="https://github.com/3nd3r1/ender-homepage"
                    className="flex flex-row items-center mb-2 gap-1 text-lg"
                >
                    <AiFillGithub className="text-2xl" />
                    <span>Source</span>
                </Link>
            </footer>
        </>
    );
};

export default HomePage;
