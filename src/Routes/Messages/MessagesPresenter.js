import React from "react";
import styled from "styled-components";
import Message from "../../Components/Message";
import Avatar from "../../Components/Avatart";
import FatText from "../../Components/FatText";
import { MessageUser } from "../../Components/Icons";

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

const Button = styled.button``;

const UserButton = styled.button`
	display: flex;
	align-items: center;
`;

export default ({ data, partUserHandle, roomId, toId }) => {
	return (
		<Wrapper>
			<Contain>
				<ContainList>
					<Header>
						<HeaderContain>
							<Dummy />
							<FatText text="Direct" />
							<Button>
								<MessageUser />
							</Button>
						</HeaderContain>
					</Header>
					<Body>
						<UserList>
							{data.map((u) =>
								u.participants.map((p) =>
									p.isMe === true ? null : (
										<UserListT key={u.id}>
											<UserButton onClick={() => partUserHandle(u.id, p)}>
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
				<Message roomId={roomId} toId={toId} />
			</Contain>
		</Wrapper>
	);
};
