import React from "react";
import { withRouter } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import ProfilePresenter from "./ProfilePresenter";

export const GET_USER = gql`
	query seeUser($username: String!) {
		seeUser(username: $username) {
			id
			avatar
			username
			firstName
			lastName
			fullName
			isFollowing
			bio
			isMe
			following {
				id
				username
				avatar
				isFollowing
			}
			followers {
				id
				username
				avatar
				isFollowing
			}
			followingCount
			followersCount
			postsCount
			posts {
				id
				location
				caption
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
				files {
					id
					url
				}
				likeCount
				commentCount
			}
		}
	}
`;

const LOG_OUT = gql`
	mutation logUserOut {
		logUserOut @client
	}
`;

export default withRouter(
	({
		match: {
			params: { username },
		},
	}) => {
		const { data, loading } = useQuery(GET_USER, { variables: { username } });
		const [logOut] = useMutation(LOG_OUT);
		return <ProfilePresenter data={data} logOut={logOut} loading={loading} />;
	}
);
