import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Avatar from "../../Components/Avatart";
import Loader from "../../Components/Loader";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import Post from "../../Components/Post";

const Wrapper = styled.div`
	min-height: 100vh;
`;

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 80%;
	margin: 0 auto;
	margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
	display: flex;
	align-items: center;
`;

const Username = styled.span`
	font-size: 26px;
	display: block;
`;

const Counts = styled.ul`
	display: flex;
	margin: 15px 0;
`;

const Count = styled.li`
	font-size: 14px;
	&:not(:last-child) {
		margin-right: 10px;
	}
`;

const Posts = styled.div`
	margin-bottom: 10px;
	display: grid;
	grid-template-columns: repeat(4, 200px);
	grid-template-rows: 200px;
	grid-auto-rows: 200px;
`;

const PostDetail = styled(Post)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 4;
`;

export default ({ loading, data, logOut }) => {
	if (loading === true) {
		return (
			<Wrapper>
				<Loader />
			</Wrapper>
		);
	} else if (!loading && data && data.seeUser) {
		const {
			seeUser: {
				id,
				avatar,
				username,
				fullName,
				isFollowing,
				bio,
				followingCount,
				followersCount,
				postsCount,
				posts,
				isMe,
			},
		} = data;
		return (
			<Wrapper>
				<Header>
					<Helmet>
						<title>{username} | Prismagram</title>
					</Helmet>
					<HeaderColumn>
						<Avatar size="lg" url={avatar} />
					</HeaderColumn>
					<HeaderColumn>
						<UsernameRow>
							<Username>{username}</Username>
							{isMe ? (
								<Button onClick={logOut} text="Log out" />
							) : (
								<FollowButton id={id} isFollowing={isFollowing} />
							)}
						</UsernameRow>
						<Counts>
							<Count>
								<FatText text={String(postsCount)} /> posts
							</Count>
							<Count>
								<FatText text={String(followersCount)} /> followers
							</Count>
							<Count>
								<FatText text={String(followingCount)} /> following
							</Count>
						</Counts>
						<FatText text={fullName} />
					</HeaderColumn>
				</Header>
				<Posts>
					{posts &&
						posts.map((post) => (
							<SquarePost
								key={post.files[0].id}
								likeCount={post.likeCount}
								commentCount={post.commentCount}
								file={post.files[0]}
							/>
						))}
				</Posts>
			</Wrapper>
		);
	}
};
