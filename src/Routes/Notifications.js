import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import Loader from "../Components/Loader";
import FatText from "../Components/FatText";
import Avatar from "../Components/Avatart";
import { Link } from "react-router-dom";

const Wrapper = styled.div``;

const Section = styled.ul``;

const SectionList = styled.li`
	border-bottom: ${(props) => props.theme.boxBorder};
	width: 100%;
	display: flex;
	align-items: center;
	padding: 5px 0;
	font-size: 18px;
	justify-content: space-around;
`;

const PostImg = styled.img`
	position: relative;
	width: 40px;
	height: 40px;
	background-image: url(${(props) => props.bg});
	background-size: cover;
	cursor: pointer;
`;

const Notifications = () => {
	const { data, loading } = useQuery(ME);
	if (loading) {
		return <Loader />;
	} else if (!loading && data && data.me && data.me.posts) {
		const {
			me: { posts, isMe },
		} = data;
		return (
			<Wrapper>
				<Section>
					{posts.map((post) =>
						post.likes.map((like) => (
							<SectionList key={like.user.id} id={like.user.id}>
								<Link to={`/${like.user.username}`}>
									<Avatar size="sm" url={like.user.avatar} />
								</Link>
								{<FatText text={like.user.username} />}
								님이 회원님의 사진을 좋아합니다
								<PostImg bg={post.files[0].url} />
							</SectionList>
						))
					)}
				</Section>
			</Wrapper>
		);
	}
};

export default Notifications;
