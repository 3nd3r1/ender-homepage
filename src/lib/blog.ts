import { cache } from "react";
import { request, gql } from "graphql-request";
import { parse } from "graphql";

import { Blog, BlogSchema } from "@/validators/blog";

type GraphQLResponse = {
    blogsConnection: {
        edges: Array<{
            node: Blog;
        }>;
    };
};

const graphqlAPI: string = process.env.GRAPHCMS_ENDPOINT!;

if (!graphqlAPI) {
    throw new Error("Missing environment variable GRAPHCMS_ENDPOINT");
}

export const getBlogs = cache(async (): Promise<Blog[]> => {
    const query = parse(gql`
        query AllBlogsWithDetails {
            blogsConnection(orderBy: created_DESC) {
                edges {
                    node {
                        content {
                            html
                        }
                        description
                        id
                        title
                        slug
                        created
                        image {
                            url
                        }
                    }
                }
            }
        }
    `);

    const response = (await request(graphqlAPI, query)) as GraphQLResponse;
    return response.blogsConnection.edges.map((edge) =>
        BlogSchema.parse(edge.node),
    );
});

export const getBlog = cache(async (slug: string): Promise<Blog> => {
    const allBlogs = await getBlogs();
    const blog = allBlogs.find((blog) => blog.slug === slug);
    if (!blog) {
        throw new Error(`Blog with slug "${slug}" not found`);
    }
    return BlogSchema.parse(blog);
});
