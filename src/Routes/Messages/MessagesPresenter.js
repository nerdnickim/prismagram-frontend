import React from "react";
import styled from "styled-components";
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
	display: flex;
	flex-direction: column;
	${(props) => props.theme.whiteBox}
`;

const Header = styled.header`
	position: relative;
	width: 35%;
	height: 12%;
	border: ${(props) => props.theme.border};
`;

const Body = styled.div`
	overflow-y: scroll;
	width: 35%;
	height: 88%;
`;

const UserList = styled.ul``;

const UserListT = styled.li`
	display: flex;
	align-items: center;
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

export default ({ data, state }) => {
	console.log(data, state);
	return (
		<Wrapper>
			<Contain>
				<Header>
					<FatText text="Direct" />
					<MessageUser />
				</Header>
				<Body>
					<UserList>
						{data.map((u) =>
							u.participants.map((p) =>
								p.id === state.meId ? null : (
									<UserListT key={u.id}>
										<Avatar size="md" url={p.avatar} />
										<Text text={p.username} />
									</UserListT>
								)
							)
						)}
					</UserList>
				</Body>
			</Contain>
		</Wrapper>
	);
};
