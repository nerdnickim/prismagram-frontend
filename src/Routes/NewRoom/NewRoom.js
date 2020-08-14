import React, { useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { ME } from "../../SharedQueries";
import Loading from "../../Components/Loading";
import FatText from "../../Components/FatText";
import Avatar from "../../Components/Avatart";
import Button from "../../Components/Button";
import { Circle, FullCircle, CloseBtn } from "../../Components/Icons";
import { SEND_MESSAGE } from "../Message/MessageQueries";
import { SEARCH } from "../Search/SearchQueries";
import useInput from "../../Hooks/useInput";

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
	z-index: 9;
`;

const CloseContain = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	background-color: rgba(0, 0, 0, 0);
`;

const Container = styled.div`
	width: 400px;
	height: 385px;
	${(props) => props.theme.whiteBox}
	z-index:11
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

const Check = styled.div`
	svg {
		fill: blue;
	}
`;

export default withRouter(({ history }) => {
	const input = useInput("");

	const { data: searchData } = useQuery(SEARCH, {
		skip: input.value === "",
		variables: { term: input.value },
	});
	const { data, loading } = useQuery(ME);
	const [newRoomMutation, { loading: roomLoading }] = useMutation(SEND_MESSAGE);
	const [toUser, setToUser] = useState([{ username: "", id: "", status: false }]);

	const selectUser = ({ toId, username }) => {
		setToUser((prev) => [...prev, { username, id: toId, status: !prev.status }]);
		toUser.map((u) =>
			u.status === true
				? u.id === toId
					? setToUser(toUser.filter((s) => s.id !== toId))
					: null
				: null
		);
	};

	const selectHandle = ({ toId }) => {
		setToUser(toUser.filter((u) => u.id !== toId));
	};

	const makeRoom = () => {
		toUser.map(async (u) => {
			if (u.id === "") {
				return;
			} else {
				const {
					data: { sendMessage },
				} = await newRoomMutation({
					variables: { toId: u.id, message: "" },
				});
				if (sendMessage) {
					history.push({ pathname: `/message/${u.id}`, state: sendMessage?.room?.id });
				}
			}
		});
	};

	const findUserHandle = (e) => {
		e.persist();
		e.preventDefault();
		if (searchData === undefined) {
			return;
		} else if (searchData.searchUser.length === 0) {
			return;
		}
	};

	const backHandle = (e) => {
		history.push("/message");
	};

	return (
		<>
			<Wrapper>
				<CloseContain onClick={backHandle}>
					<CloseBtn />
				</CloseContain>
				<Container>
					<Header>
						<Dummy />
						<FatText text={"New Message"} />
						<BtnContain>
							{roomLoading ? <Loading /> : <Button text="Next" onClick={makeRoom} />}
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
							<Form onChange={findUserHandle}>
								<Input
									type="text"
									value={input.value}
									onChange={input.onChange}
									placeholder="Search..."
								/>
							</Form>
						</Div>
					</SearchContain>
					{loading ? (
						<Loading />
					) : (
						<Body>
							<UserList>
								{searchData
									? searchData.searchUser.map((u) => (
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
									  ))
									: data?.me?.following?.map((u) => (
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
		</>
	);
});
