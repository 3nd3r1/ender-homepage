export type Work = {
    id: string;
    title: string;
    description: string;
    slug: string;
    image: {
        url: string;
    };
};

export type WorkInfo = {
    id: string;
    title: string;
    text: string;
    isLink: boolean;
    url: string;
};

export type WorkDetails = {
    createdYear: string;
    description: string;
    content: {
        html: string;
    };
    id: string;
    slug: string;
    title: string;
    image: {
        url: string;
    };
    workInfos: WorkInfo[];
};
