import React from "react";
import { Metadata, Viewport } from "next";

import "./globals.scss";

import Navbar from "@/components/navbar";
import Transition from "@/components/transition";
import Providers from "./providers";

export const metadata: Metadata = {
    title: "Viljami Ranta | Homepage",
    description:
        "Viljami Ranta, software engineer working on AI infrastructure: scheduling, self-service platforms, and data systems. Incoming at Palantir London.",
    keywords: [
        "viljami ranta",
        "viljami",
        "ranta",
        "software engineer",
        "ai infrastructure",
        "semantic operators",
        "distributed systems",
        "data systems",
        "kubernetes",
        "go",
        "postgresql",
        "palantir",
        "helsinki",
        "london",
    ],
    category: "technology",
    creator: "Viljami Ranta",
    metadataBase: new URL("https://viljamiranta.fi/"),
    openGraph: {
        title: "Viljami Ranta — Software Engineer",
        description:
            "Viljami Ranta, software engineer working on AI infrastructure: scheduling, self-service platforms, and data systems. Incoming at Palantir London.",
        url: "https://viljamiranta.fi/",
        siteName: "Viljami Ranta",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Viljami Ranta — Software Engineer",
        description:
            "Viljami Ranta, software engineer working on AI infrastructure: scheduling, self-service platforms, and data systems. Incoming at Palantir London.",
        creator: "@enderguru",
        creatorId: "1430825859519234055",
        siteId: "1430825859519234055",
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/images/favicon/favicon-32x32.png", sizes: "32x32" },
            { url: "/images/favicon/favicon-16x16.png", sizes: "16x16" },
        ],
        shortcut: "/favicon.ico",
        apple: [
            { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180" },
        ],
    },
    manifest: "https://viljamiranta.fi/site.webmanifest",
};

export const viewport: Viewport = {
    colorScheme: "dark",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="min-h-screen dark:bg-black dark:text-white bg-white text-slate-900 transition-colors ease-in-out duration-300">
                        <Navbar />
                        <main className="pt-24 pb-12">
                            <Transition>
                                <article className="mx-auto max-w-lg font-term px-4">
                                    {children}
                                </article>
                            </Transition>
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
