import { gql } from "apollo-boost";

export const ME = gql`
	{
		me {
			username
		}
	}
`;

export const FEED_QUERY = gql`
	{
		seeFeed {
			id
			location
			caption
			user {
				id
				avatar
				username
			}
			files {
				id
				url
			}
			likeCount
			isLiked
			comments {
				id
				text
				user {
					id
					username
				}
			}
			createdAt
		}
	}
`;

export const SEE_POST = gql`
	query seePost($id: String!) {
		seeFullPost(id: $id) {
			id
			location
			caption
			user {
				id
				avatar
				username
			}
			files {
				id
				url
			}
			likeCount
			isLiked
			comments {
				id
				text
				user {
					id
					username
				}
			}
			createdAt
		}
	}
`;
