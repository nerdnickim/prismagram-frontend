import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import { FEED_QUERY, ME } from "../SharedQueries";
import FollowingUser from "../Components/FollowingUser";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 50vh;
`;

export default () => {
	const { data, loading } = useQuery(FEED_QUERY);
	const { data: dataMe } = useQuery(ME);
	return (
		<Wrapper>
			<Helmet>
				<title>Feed | Prismagram</title>
			</Helmet>
			{loading && <Loader />}
			{!loading && dataMe?.me && <FollowingUser data={dataMe?.me?.following} />}
			{!loading &&
				data &&
				data.seeFeed &&
				data.seeFeed.map((post) => (
					<Post
						key={post.id}
						id={post.id}
						user={post.user}
						files={post.files}
						likeCount={post.likeCount}
						isLiked={post.isLiked}
						comments={post.comments}
						createdAt={post.createdAt}
						location={post.location}
						caption={post.caption}
					/>
				))}
		</Wrapper>
	);
};
