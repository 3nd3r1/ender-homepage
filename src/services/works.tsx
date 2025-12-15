import { cache } from "react";
import { request, gql } from "graphql-request";
import { parse } from "graphql";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Work, WorkDetails } from "@/lib/definitions";

type GraphQLResponse = {
    worksConnection: {
        edges: Array<{
            node: WorkDetails;
        }>;
    };
};

const graphqlAPI: string = process.env.GRAPHCMS_ENDPOINT!;

if (!graphqlAPI) {
    throw new Error("Missing environment variable GRAPHCMS_ENDPOINT");
}

// Single query to fetch all works with full details
export const getAllWorksWithDetails = cache(async () => {
    const query = parse(gql`
        query AllWorksWithDetails {
            worksConnection(first: 100) {
                edges {
                    node {
                        id
                        title
                        description
                        slug
                        createdYear
                        content {
                            html
                        }
                        image {
                            url
                        }
                        workInfos {
                            id
                            title
                            text
                            isLink
                            url
                        }
                    }
                }
            }
        }
    `);

    const response = (await request(graphqlAPI, query)) as GraphQLResponse;
    return response.worksConnection.edges.map((edge) => edge.node);
});

export const getWorks = cache(async (): Promise<Work[]> => {
    const allWorks = await getAllWorksWithDetails();
    return allWorks.map((work) => ({
        id: work.id,
        title: work.title,
        description: work.description,
        slug: work.slug,
        image: work.image,
    }));
});

export const getWorkDetails = cache(
    async (slug: string): Promise<WorkDetails> => {
        const allWorks = await getAllWorksWithDetails();
        const work = allWorks.find((work) => work.slug === slug);
        if (!work) {
            throw new Error(`Work with slug "${slug}" not found`);
        }
        return work as WorkDetails;
    },
);
