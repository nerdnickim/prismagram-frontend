import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Avatar from "../../Components/Avatart";
import Loader from "../../Components/Loader";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import { CustomGear, CloseBtn } from "../../Components/Icons";
import FollowBox from "../../Components/FollowBox";
import EditProfile from "../EditProfile";

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
	margin-right: 10px;
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

const CloseContain = styled.div`
	position: absolute;
	top: 20px;
	right: 40px;
	z-index: 11;
	cursor: poninter;
`;

const GearContain = styled.div``;

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
				firstName,
				lastName,
				fullName,
				isFollowing,
				following,
				followers,
				postsCount,
				posts,
				isMe,
			},
		} = data;
		let [follow, setFollow] = useState(false);
		let [followingS, setFollowingS] = useState(false);
		let [custom, setcustom] = useState(false);

		const showFollowBox = (e) => {
			e.preventDefault();
			if (follow === true) {
				setFollow(false);
				document.querySelector("body").style.overflow = "";
				return;
			} else {
				setFollow(true);
				document.querySelector("body").style.overflow = "hidden";
			}
		};

		const showFollowingBox = (e) => {
			e.preventDefault();
			if (followingS === true) {
				setFollowingS(false);
				document.querySelector("body").style.overflow = "";
			} else {
				setFollowingS(true);
				document.querySelector("body").style.overflow = "hidden";
			}
		};

		const showCustom = (e) => {
			e.preventDefault();
			if (custom === true) {
				setcustom(false);
				document.querySelector("body").style.overflow = "";
			} else {
				setcustom(true);
				document.querySelector("body").style.overflow = "hidden";
			}
		};

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
							{isMe ? (
								<GearContain onClick={showCustom}>
									<CustomGear />
								</GearContain>
							) : null}
						</UsernameRow>
						<Counts>
							<Count>
								<FatText text={String(postsCount)} /> posts
							</Count>
							<Count onClick={showFollowBox}>
								<FatText text={String(followers.length)} /> followers
							</Count>
							<Count onClick={showFollowingBox}>
								<FatText text={String(following.length)} /> following
							</Count>
							{custom === true ? (
								<>
									<EditProfile
										username={username}
										firstName={firstName}
										lastName={lastName}
									/>
									<CloseContain onClick={showCustom}>
										<CloseBtn />
									</CloseContain>
								</>
							) : null}
							{follow === true ? (
								<>
									<FollowBox data={followers} />
									<CloseContain onClick={showFollowBox}>
										<CloseBtn />
									</CloseContain>
								</>
							) : null}
							{followingS === true ? (
								<>
									<FollowBox data={following} />
									<CloseContain onClick={showFollowingBox}>
										<CloseBtn />
									</CloseContain>
								</>
							) : null}
						</Counts>
						<FatText text={fullName} />
					</HeaderColumn>
				</Header>
				<Posts>
					{posts &&
						posts.map((post) => (
							<SquarePost
								key={post.files[0].id}
								id={post.id}
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
