import { gql } from "@apollo/client";

export const ME = gql`
	{
		me {
			id
			username
			avatar
			updatedAt
			isMe
			following {
				id
				avatar
				username
			}
			posts {
				id
				isLiked
				files {
					id
					url
				}
				likes {
					id
					user {
						id
						avatar
						username
					}
				}
			}
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
			commentCount
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
