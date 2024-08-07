import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                term: '"Ubuntu Mono", monospace',
            },
            keyframes: {
                "cursor-blink": {
                    "0%, 100%": { opacity: "0" },
                    "50%": { opacity: "1" },
                },
            },
            animation: {
                "cursor-blink": "1s cursor-blink step-end infinite",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;
