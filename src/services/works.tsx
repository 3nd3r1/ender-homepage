import { cache } from "react";
import { request, gql } from "graphql-request";
import { parse } from "graphql";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Work, WorkDetails } from "@/lib/definitions";

const graphqlAPI: string = process.env.GRAPHCMS_ENDPOINT!;

if (!graphqlAPI) {
    throw new Error("Missing environment variable GRAPHCMS_ENDPOINT");
}

export const getWorks = cache(async (): Promise<Work[]> => {
    const query: TypedDocumentNode<
        { worksConnection: { edges: { node: Work }[] } },
        Record<any, never>
    > = parse(gql`
        query Assets {
            worksConnection {
                edges {
                    node {
                        id
                        title
                        description
                        slug
                        image {
                            url
                        }
                    }
                }
            }
        }
    `);

    const response = await request(graphqlAPI, query);

    return response.worksConnection.edges.map((edge: any) => edge.node as Work);
});

export const getWorkDetails = cache(
    async (slug: string): Promise<WorkDetails> => {
        const query: TypedDocumentNode<
            { work: WorkDetails },
            { slug: string }
        > = parse(gql`
            query GetProjectDetails($slug: String!) {
                work(where: { slug: $slug }) {
                    createdYear
                    description
                    content {
                        html
                    }
                    id
                    slug
                    title
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
        `);

        const response = await request(graphqlAPI, query, { slug });
        return response.work;
    },
);
