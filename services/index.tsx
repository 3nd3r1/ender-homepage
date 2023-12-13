import { request, gql } from "graphql-request";

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;
console.log(graphqlAPI);

export const getWorks = () => {
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

	const req = request(graphqlAPI, query);

	return req.then((response) => response.worksConnection.edges);
};

export const getWorkDetails = (slug: string) => {
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

	const req = request(graphqlAPI, query, { slug });
	return req.then((response) => response.work);
};
