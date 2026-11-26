import type { Metadata } from "next";

import CardView from "@/components/card-view";

export const metadata: Metadata = {
    title: "Viljami Ranta | Card",
    description:
        "Digital business card for Viljami Ranta — Software Engineer. Save contact or connect on GitHub, LinkedIn, X, and more.",
    openGraph: {
        title: "Viljami Ranta — Digital Card",
        description:
            "Save Viljami Ranta's contact or connect on GitHub, LinkedIn, X, and more.",
        url: "https://viljamiranta.fi/card",
        siteName: "Viljami Ranta",
        locale: "en_US",
        type: "website",
    },
};

const CardPage = () => {
    return <CardView />;
};

export default CardPage;
