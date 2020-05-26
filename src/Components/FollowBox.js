import React from "react";
import styled from "styled-components";
import Avatar from "./Avatart";
import FatText from "./FatText";
import FollowButton from "./FollowButton";

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
`;

const FollowBox = styled.div`
	${(props) => props.theme.whiteBox};
	position: relative;
	width: 600px;
	height: 400px;
	overflow-y: scroll;
`;

const BtnBox = styled.div`
	width: 80px;
	margin-right: 40px;
`;

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	padding: 20px 0px;
	border-bottom: ${(props) => props.theme.border};
`;

const Section = styled.div``;

const UserCotain = styled.ul``;

const UserList = styled.li`
	border-bottom: ${(props) => props.theme.border};
	padding: 10px;
	display: flex;
	justify-content: space-between;
`;

const InfoContain = styled.div`
	display: flex;
	align-items: center;
`;

export default ({ data }) => {
	return (
		<Wrapper>
			<FollowBox>
				<Header>Follower</Header>
				<Section>
					<UserCotain>
						{data.map((user) => (
							<UserList>
								<InfoContain>
									<Avatar url={user.avatar} />
									<FatText text={user.username} />
								</InfoContain>
								<BtnBox>
									<FollowButton id={user.id} isFollowing={user.isFollowing} />
								</BtnBox>
							</UserList>
						))}
					</UserCotain>
				</Section>
			</FollowBox>
		</Wrapper>
	);
};
