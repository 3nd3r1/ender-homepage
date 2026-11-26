"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
    AiFillGithub,
    AiFillLinkedin,
    AiOutlineCheck,
    AiOutlineCopy,
    AiOutlineGlobal,
    AiOutlineMail,
    AiOutlineQrcode,
    AiOutlineUserAdd,
} from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import {
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosArrowUp,
} from "react-icons/io";

import ThemeSwitch from "@/components/theme-switch";
import CardContactForm from "@/components/card-contact-form";

const CARD_URL = "https://viljamiranta.fi/card";
const DISPLAY_URL = "card.viljamiranta.fi";
const HAS_WEB3FORMS = Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

type CardLinkItem = {
    label: string;
    value: string;
    href: string;
    icon: React.ReactNode;
    external?: boolean;
};

const LINKS: CardLinkItem[] = [
    {
        label: "Website",
        value: "viljamiranta.fi",
        href: "/",
        icon: <AiOutlineGlobal className="text-xl shrink-0" />,
    },
    {
        label: "Email",
        value: "ranta.viljami@gmail.com",
        href: "mailto:ranta.viljami@gmail.com",
        icon: <AiOutlineMail className="text-xl shrink-0" />,
    },
    {
        label: "GitHub",
        value: "github.com/3nd3r1",
        href: "https://github.com/3nd3r1",
        icon: <AiFillGithub className="text-xl shrink-0" />,
        external: true,
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/viljami-ranta",
        href: "https://www.linkedin.com/in/viljami-ranta/",
        icon: <AiFillLinkedin className="text-xl shrink-0" />,
        external: true,
    },
    {
        label: "X",
        value: "@enderguru",
        href: "https://x.com/enderguru",
        icon: <FaXTwitter className="text-lg shrink-0" />,
        external: true,
    },
    {
        label: "LeetCode",
        value: "leetcode.com/3nd3r1",
        href: "https://leetcode.com/3nd3r1/",
        icon: <SiLeetcode className="text-lg shrink-0" />,
        external: true,
    },
];

const CardView = () => {
    const [showQr, setShowQr] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(`https://${DISPLAY_URL}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API unavailable
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-black"
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-300 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400 before:content-['>_'] before:text-purple-700 dark:before:text-purple-500">
                        {DISPLAY_URL}
                    </span>
                    <ThemeSwitch />
                </div>

                <div className="p-6 flex flex-col gap-6">
                    {/* Identity */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
                        <div className="relative w-24 h-24 shrink-0">
                            <span className="absolute rounded-full border-2 border-purple-500 dark:border-white w-full h-full shadow-md overflow-hidden">
                                <Image
                                    src="/images/me.png"
                                    alt="Picture of Viljami Ranta"
                                    fill
                                    priority
                                    className="rounded-full object-cover object-[50%_10%]"
                                />
                            </span>
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <h1 className="text-3xl font-bold leading-tight">
                                Viljami Ranta
                            </h1>
                            <div className="flex flex-row items-center mt-0.5">
                                <p className="text-base text-gray-700 dark:text-gray-300">
                                    Software Engineer
                                </p>
                                <span className="ml-1 bg-slate-900 dark:bg-white w-2 h-5 animate-cursor-blink" />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                AI Infrastructure · Incoming @ Palantir
                            </p>
                        </div>
                    </div>

                    {/* Primary actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                            href="/viljami-ranta.vcf"
                            download="Viljami-Ranta.vcf"
                            className="flex items-center justify-center gap-2 !text-black dark:!text-white bg-purple-500 dark:bg-purple-800 hover:bg-purple-400 dark:hover:bg-purple-900 rounded-none py-2.5 px-4 text-base font-bold transition-colors duration-200 ease-in-out"
                        >
                            <AiOutlineUserAdd className="text-xl" />
                            <span>Save Contact</span>
                        </a>
                        <button
                            type="button"
                            onClick={() => setShowQr((prev) => !prev)}
                            className="flex items-center justify-center gap-2 border border-gray-400 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 rounded-none py-2.5 px-4 text-base font-bold transition-colors duration-200 ease-in-out"
                        >
                            <AiOutlineQrcode className="text-xl" />
                            <span>{showQr ? "Hide QR" : "Show QR"}</span>
                        </button>
                    </div>

                    {/* Collapsible QR Code */}
                    <AnimatePresence initial={false}>
                        {showQr && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col items-center gap-3 p-4 border border-gray-300 dark:border-gray-800 bg-zinc-50 dark:bg-zinc-950">
                                    <div className="bg-white p-3">
                                        <QRCodeSVG
                                            value={CARD_URL}
                                            size={180}
                                            level="M"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleCopyLink}
                                        className="flex items-center gap-1.5 text-xs text-purple-700 dark:text-purple-400 hover:underline"
                                    >
                                        {copied ? (
                                            <>
                                                <AiOutlineCheck />
                                                <span>Copied link!</span>
                                            </>
                                        ) : (
                                            <>
                                                <AiOutlineCopy />
                                                <span>Copy {DISPLAY_URL}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Social & Website links */}
                    <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800 border border-gray-300 dark:border-gray-800">
                        {LINKS.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    target={
                                        item.external ? "_blank" : undefined
                                    }
                                    rel={
                                        item.external
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors duration-150 group"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="text-purple-700 dark:text-purple-500">
                                            {item.icon}
                                        </span>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                                                {item.label}
                                            </span>
                                            <span className="text-sm sm:text-base truncate mt-0.5 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                                                {item.value}
                                            </span>
                                        </div>
                                    </div>
                                    <IoIosArrowForward className="text-sm text-gray-400 dark:text-gray-600 group-hover:text-purple-700 dark:group-hover:text-purple-400 shrink-0 transition-colors" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Optional Contact Exchange Form */}
                    {HAS_WEB3FORMS && (
                        <div className="border-t border-gray-300 dark:border-gray-800 pt-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowContactForm((prev) => !prev)
                                }
                                className="w-full flex items-center justify-between text-left text-sm font-bold text-purple-700 dark:text-purple-400 hover:underline"
                            >
                                <span>&gt;_ Leave your contact</span>
                                {showContactForm ? (
                                    <IoIosArrowUp />
                                ) : (
                                    <IoIosArrowDown />
                                )}
                            </button>
                            <AnimatePresence initial={false}>
                                {showContactForm && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden pt-2"
                                    >
                                        <CardContactForm />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default CardView;
