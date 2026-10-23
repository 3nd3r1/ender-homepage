import { ogColors, ogSize, readAsset, renderOgImage } from "@/lib/og";

export const alt = "Viljami Ranta, Software Engineer";
export const size = ogSize;
export const contentType = "image/png";

const PHOTO_SIZE = 380;

export default async function OpenGraphImage() {
    const photo = await readAsset("public", "images", "me.png");
    const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

    return renderOgImage(
        "~/viljamiranta.fi",
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                color: ogColors.text,
            }}
        >
            <div style={{ fontSize: 30, color: ogColors.accent }}>$ whoami</div>
            <div
                style={{
                    marginTop: 12,
                    fontSize: 76,
                    fontWeight: 700,
                    lineHeight: 1,
                }}
            >
                Viljami Ranta
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 16,
                    fontSize: 40,
                }}
            >
                Software Engineer
                <div
                    style={{
                        width: 18,
                        height: 40,
                        marginLeft: 8,
                        background: ogColors.text,
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: 40,
                    fontSize: 28,
                    lineHeight: 1.4,
                    color: ogColors.muted,
                }}
            >
                Building the infrastructure layer that AI systems run on.
            </div>
        </div>,
        <div
            style={{
                position: "relative",
                display: "flex",
                width: PHOTO_SIZE,
                height: PHOTO_SIZE,
                borderRadius: PHOTO_SIZE / 2,
                border: `4px solid ${ogColors.text}`,
                overflow: "hidden",
            }}
        >
            <img
                src={photoSrc}
                alt=""
                width={PHOTO_SIZE}
                height={PHOTO_SIZE * 1.5}
                style={{
                    position: "absolute",
                    top: -PHOTO_SIZE * 0.06,
                    left: 0,
                }}
            />
        </div>,
    );
}
