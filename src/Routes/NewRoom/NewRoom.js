import React, { useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ME } from "../../SharedQueries";
import Loading from "../../Components/Loading";
import FatText from "../../Components/FatText";
import Avatar from "../../Components/Avatart";
import Button from "../../Components/Button";
import { Circle } from "../../Components/Icons";

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
`;

const Container = styled.div`
	width: 400px;
	height: 385px;
	${(props) => props.theme.whiteBox}
`;

const Header = styled.header`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
	border-bottom: ${(props) => props.theme.boxBorder};
`;

const Dummy = styled.div`
	width: 13%;
`;

const BtnContain = styled.div`
	width: 13%;
`;

const SearchContain = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 10px 0;
	border-bottom: ${(props) => props.theme.boxBorder};
`;

const Span = styled.span`
	margin: 0 0 0 10px;
`;

const Div = styled.div`
	width: 100%;
	display: flex;
`;

const Form = styled.form`
	margin: 0 20px 0 5px;
`;

const Input = styled.input`
	width: 100%;
	padding: 4px 0;
`;

const Body = styled.div``;

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

const UserButton = styled.button`
	display: flex;
	width: 100%;
	cursor: pointer;
	justify-content: space-between;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
`;

const Check = styled.div``;

export default withRouter(() => {
	const { data, loading } = useQuery(ME);
	const [toUser, setToUser] = useState([{ username: "", id: "", status: false }]);

	const selectUser = ({ toId, username }) => {
		setToUser((prev) => [...prev, { username, id: toId, status: !prev.status }]);

		toUser.map((u) =>
			u.status === true ? setToUser(toUser.filter((u) => u.id !== toId)) : null
		);
	};

	const selectHandle = ({ toId }) => {
		toUser.map((u) =>
			u.status === true ? setToUser(toUser.filter((u) => u.id !== toId)) : null
		);
	};

	return (
		<Wrapper>
			<Container>
				<Header>
					<Dummy />
					<FatText text={"New Message"} />
					<BtnContain>
						<Button text="Next" />
					</BtnContain>
				</Header>
				<SearchContain>
					<Span>ToUser:</Span>
					<Div>
						{toUser.map((s) =>
							s.username === "" ? null : (
								<BtnContain key={s.id}>
									<Button
										text={s.username}
										onClick={() => selectHandle({ toId: s.id })}
									/>
								</BtnContain>
							)
						)}
						<Form onSubmit={null}>
							<Input type="text" placeholder="Search..." />
						</Form>
					</Div>
				</SearchContain>
				{loading ? (
					<Loading />
				) : (
					<Body>
						<UserList>
							{data?.me?.following?.map((u) => (
								<UserListT key={u.id}>
									<UserButton
										onClick={() => selectUser({ toId: u.id, username: u.username })}
									>
										<UserInfo>
											<Avatar sime="sm" url={u.avatar} />
											<Text text={u.username} />
										</UserInfo>
										<Check>
											<Circle />
										</Check>
									</UserButton>
								</UserListT>
							))}
						</UserList>
					</Body>
				)}
			</Container>
		</Wrapper>
	);
});