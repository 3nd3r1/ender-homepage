"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar";
import Transition from "@/components/transition";

const SiteShell = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isStandaloneCard = pathname?.startsWith("/card");

    return (
        <div className="min-h-screen dark:bg-black dark:text-white bg-white text-slate-900 transition-colors ease-in-out duration-300">
            {isStandaloneCard ? (
                <main className="font-term">{children}</main>
            ) : (
                <>
                    <Navbar />
                    <main className="pt-24 pb-12">
                        <Transition>
                            <article className="mx-auto max-w-lg font-term px-4">
                                {children}
                            </article>
                        </Transition>
                    </main>
                </>
            )}
        </div>
    );
};

export default SiteShell;
