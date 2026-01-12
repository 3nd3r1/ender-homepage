import React from "react";
import { Metadata, Viewport } from "next";

import "./globals.scss";

import Navbar from "@/components/navbar";
import Transition from "@/components/transition";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "Viljami Ranta | Homepage",
    description: "Viljami's personal website - Developer and Problem-solver",
    keywords: [
        "viljami ranta",
        "viljami",
        "ranta",
        "programmer",
        "software engineer",
        "problem-solver",
        "cloud",
        "go",
        "typescript",
        "programming",
        "viiteri",
        "soteriareitti",
    ],
    category: "influencer",
    creator: "Viljami Ranta",
    metadataBase: new URL("https://viljamiranta.fi/"),
    openGraph: {
        title: "Viljami Ranta | Homepage",
        description:
            "Viljami's personal website - Developer and Problem-solver",
        url: "https://viljamiranta.fi/",
        siteName: "Viljami Ranta",
        images: ["/images/me.JPG"],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Viljami Ranta | Homepage",
        description:
            "Viljami's personal website - Developer and Problem-solver",
        creator: "@enderguru",
        creatorId: "1430825859519234055",
        siteId: "1430825859519234055",
        images: ["/images/me.JPG"],
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/images/favicon-32x32.png", sizes: "32x32" },
            { url: "/images/favicon-16x16.png", sizes: "16x16" },
        ],
        shortcut: "/favicon.ico",
        apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
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
                </ThemeProvider>
            </body>
        </html>
    );
}
