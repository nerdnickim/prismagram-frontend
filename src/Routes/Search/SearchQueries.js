import { gql } from "apollo-boost";

export const SEARCH = gql`
	query search($term: String!) {
		searchPost(term: $term) {
			files {
				id
				url
			}
			likeCount
		}
		searchUser(term: $term) {
			id
			avatar
			username
			isFollowing
			isMe
		}
	}
`;
