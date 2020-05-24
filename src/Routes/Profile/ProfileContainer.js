import React from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
	query seeUser($username: String!) {
		seeUser(username: $username) {
			id
			avatar
			username
			fullName
			isFollowing
			bio
			isMe
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
