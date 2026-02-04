import { cache } from "react";
import { request, gql } from "graphql-request";
import { parse } from "graphql";

import { Work, WorkSchema } from "@/validators/work";

type GraphQLResponse = {
    worksConnection: {
        edges: Array<{
            node: Work;
        }>;
    };
};

const graphqlAPI: string = process.env.GRAPHCMS_ENDPOINT!;

if (!graphqlAPI) {
    throw new Error("Missing environment variable GRAPHCMS_ENDPOINT");
}

export const getWorks = cache(async (): Promise<Work[]> => {
    const query = parse(gql`
        query AllWorksWithDetails {
            worksConnection(first: 100, orderBy: createdYear_DESC) {
                edges {
                    node {
                        id
                        title
                        description
                        slug
                        createdYear
                        featured
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
    return response.worksConnection.edges.map((edge) =>
        WorkSchema.parse(edge.node),
    );
});

export const getFeaturedWorks = cache(async (): Promise<Work[]> => {
    const allWorks = await getWorks();
    return allWorks.filter((work) => work.featured === true);
});

export const getWork = cache(async (slug: string): Promise<Work> => {
    const allWorks = await getWorks();
    const work = allWorks.find((work) => work.slug === slug);
    if (!work) {
        throw new Error(`Work with slug "${slug}" not found`);
    }
    return WorkSchema.parse(work);
});
