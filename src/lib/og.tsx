import React from "react";
import { readFile } from "fs/promises";
import path from "path";

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
    background: "#000",
    border: "#3f3f46",
    titleBar: "#18181b",
    text: "#fff",
    muted: "#a1a1aa",
    accent: "#a855f7",
};

export const readAsset = (...segments: string[]) =>
    readFile(path.join(process.cwd(), ...segments));

const WindowDot = ({ color }: { color: string }) => (
    <div
        style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: color,
        }}
    />
);

const OgFrame = ({
    path,
    content,
    aside,
}: {
    path: string;
    content: React.ReactNode;
    aside: React.ReactNode;
}) => (
    <div
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            padding: 40,
            background: ogColors.background,
            fontFamily: "Ubuntu Mono",
        }}
    >
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                border: `2px solid ${ogColors.border}`,
                borderRadius: 16,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 20px",
                    background: ogColors.titleBar,
                    borderBottom: `2px solid ${ogColors.border}`,
                }}
            >
                <WindowDot color="#ef4444" />
                <WindowDot color="#eab308" />
                <WindowDot color="#22c55e" />
                <div
                    style={{
                        marginLeft: 16,
                        fontSize: 22,
                        color: ogColors.muted,
                    }}
                >
                    {path}
                </div>
            </div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 56,
                    padding: "0 56px",
                }}
            >
                {content}
                {aside}
            </div>
        </div>
    </div>
);

export const renderOgImage = async (
    framePath: string,
    content: React.ReactNode,
    aside: React.ReactNode,
) => {
    const [monoRegular, monoBold] = await Promise.all([
        readAsset("src", "assets", "fonts", "UbuntuMono-Regular.ttf"),
        readAsset("src", "assets", "fonts", "UbuntuMono-Bold.ttf"),
    ]);

    return new ImageResponse(
        <OgFrame path={framePath} content={content} aside={aside} />,
        {
            ...ogSize,
            fonts: [
                { name: "Ubuntu Mono", data: monoRegular, weight: 400 },
                { name: "Ubuntu Mono", data: monoBold, weight: 700 },
            ],
        },
    );
};
