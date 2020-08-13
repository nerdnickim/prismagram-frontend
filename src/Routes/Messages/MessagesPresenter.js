import React from "react";
import styled from "styled-components";
import Avatar from "../../Components/Avatart";
import FatText from "../../Components/FatText";
import { MessageUser } from "../../Components/Icons";
import Button from "../../Components/Button";
import { Link, Route, Switch } from "react-router-dom";
import NewRoom from "../NewRoom";
import Message from "../Message";

const Wrapper = styled.div`
	justify-content: center;
	align-items: center;
	height: 670px;
`;

const Contain = styled.div`
	max-width: 935px;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 2fr;
	${(props) => props.theme.whiteBox};
`;

const ContainList = styled.div`
	display: flex;
	flex-direction: column;
`;

const Header = styled.header`
	position: relative;
	height: 12%;
	border: ${(props) => props.theme.border};
`;

const HeaderContain = styled.div`
	display: flex;
	height: 100%;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px;
`;

const Dummy = styled.div``;

const Body = styled.div`
	overflow-y: scroll;
	height: 88%;
`;

const ButtonBody = styled.div`
	width: 100%;
	height: 88%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const UserList = styled.ul``;

const UserListT = styled.li`
	padding: 0 10px;
	margin: 12px 0;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.theme.bgColor};
	}
`;

const Text = styled(FatText)`
	margin: 0 10px;
`;

const ButtonUser = styled.button``;

const UserButton = styled(Link)`
	display: flex;
	align-items: center;
	color: black;
	width: 100%;
`;

const ButtonContain = styled.div`
	width: 30%;
`;

export default ({ data, partUserHandle, roomId, toId, loadingBtn }) => {
	return (
		<Wrapper>
			<Contain>
				<ContainList>
					<Header>
						<HeaderContain>
							<Dummy />
							<FatText text="Direct" />
							<ButtonUser>
								<MessageUser />
							</ButtonUser>
						</HeaderContain>
					</Header>
					<Body>
						<UserList>
							{data.map((u) =>
								u.participants.map((p) =>
									p.isMe === true ? null : (
										<UserListT key={u.id}>
											<UserButton
												onClick={() => partUserHandle(u.id, p)}
												to={{
													pathname: `/message/${toId}`,
													state: {
														roomId,
													},
												}}
											>
												<Avatar size="md" url={p.avatar} />
												<Text text={p.username} />
											</UserButton>
										</UserListT>
									)
								)
							)}
						</UserList>
					</Body>
				</ContainList>
				<ButtonBody>
					{loadingBtn ? null : (
						<ButtonContain>
							<Link to="/message/newRoom">
								<Button text={"Send Message"} />
							</Link>
						</ButtonContain>
					)}
					<Switch>
						<Route path="/message/newRoom" component={NewRoom} />
						<Route path="/message/:toId" component={Message} />
					</Switch>
				</ButtonBody>
			</Contain>
		</Wrapper>
	);
};
