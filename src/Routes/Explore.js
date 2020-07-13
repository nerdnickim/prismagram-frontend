import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { FEED_QUERY } from "../SharedQueries";
import Loader from "../Components/Loader";
import SquarePost from "../Components/SquarePost";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
	height: 100%;
`;

const Section = styled.div`
	display: grid;
	grid-gap: 25px;
	grid-template-columns: repeat(4, 160px);
	grid-template-rows: 160px;
	grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
	grid-template-columns: repeat(4, 200px);
	grid-template-rows: 200px;
	grid-auto-rows: 200px;
`;

export default () => {
	const { data, loading } = useQuery(FEED_QUERY);
	if (loading) {
		return <Loader />;
	} else if (!loading && data && data.seeFeed) {
		return (
			<Wrapper>
				<Helmet>
					<title>Explore | Prismagram</title>
				</Helmet>
				<Section></Section>
				<PostSection>
					{data.seeFeed.map((post) => (
						<SquarePost
							key={post.files[0].id}
							id={post.id}
							likeCount={post.likeCount}
							commentCount={post.commentCount}
							file={post.files[0]}
						/>
					))}
				</PostSection>
			</Wrapper>
		);
	}
};
