import { request, gql } from "graphql-request";

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

if (!graphqlAPI) {
	throw new Error("Missing environment variable GRAPHCMS_ENDPOINT");
}

export const getWorks = async () => {
    const query = gql`
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
    `;

    const response = await request(graphqlAPI, query);

	return response.worksConnection.edges
};

export const getWorkDetails = async (slug: string) => {
    const query = gql`
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
    `;

	const response = await request(graphqlAPI, query, { slug });
	return response.work
};
