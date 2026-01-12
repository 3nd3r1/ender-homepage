"use client";

import React, { useContext, useRef, useMemo } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

const FrozenRouter = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(LayoutRouterContext);
    const frozenContext = useRef(context);

    // Only update the frozen context when it's null/undefined
    if (!frozenContext.current) {
        frozenContext.current = context;
    }

    const memoizedProvider = useMemo(() => {
        if (frozenContext.current === context) {
            return children;
        }
        return (
            <LayoutRouterContext.Provider value={frozenContext.current}>
                {children}
            </LayoutRouterContext.Provider>
        );
    }, [children, context]);

    return memoizedProvider;
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
