"use client";

import { useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

const FrozenRouter = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(LayoutRouterContext);
    const frozen = useRef(context).current;
    return (
        <LayoutRouterContext.Provider value={frozen}>
            {children}
        </LayoutRouterContext.Provider>
    );
};

const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 20 },
};

const Transition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence
            mode="wait"
            initial={true}
            onExitComplete={() => {
                if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0 });
                }
            }}
        >
            <motion.div
                key={pathname}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4, type: "easeInOut" }}
            >
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </AnimatePresence>
    );
};

export default Transition;
