import React from "react";
import styled from "styled-components";
import Button from "../Button";
import FatText from "../FatText";
import Loading from "../Loading";
import Avatar from "../Avatart";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Header = styled.header`
	width: 100%;
	height: 12%;
	border: ${(props) => props.theme.border};
	display: flex;
	align-items: center;
`;

const HeaderContain = styled.div`
	display: flex;
	align-items: center;
	color: black;
	margin-left: 20px;
`;

const Body = styled.div`
	width: 100%;
	height: 88%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ButtonContain = styled.div`
	width: 30%;
`;

const TextContain = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 80%;
	overflow-y: scroll;
`;

const Text = styled.li`
	margin: 10px 15px;
`;

const From = styled.div`
	border: ${(props) => props.theme.border};
	border-radius: 10px;
	float: right;
	background-color: ${(props) => props.theme.bgColor};
	padding: 8px 12px;
`;

const ToContain = styled.div`
	display: flex;
	flex-direction: row;
`;

const To = styled.div`
	border: ${(props) => props.theme.border};
	float: left;
	border-radius: 10px;
	padding: 8px 12px;
`;

const TextInputContain = styled.div`
	width: 100%;
	height: 20%;
`;

const MessagePresenter = ({ data, loading }) => {
	return (
		<Wrapper>
			{loading ? (
				<Loading />
			) : data ? (
				<>
					<Header>
						{data?.participants?.map((p) =>
							p.isMe === true ? null : (
								<Link to={p.username} key={p.id}>
									<HeaderContain>
										<Avatar size="sm" url={p.avatar} />
										<FatText text={p.username} />
									</HeaderContain>
								</Link>
							)
						)}
					</Header>
					<Body>
						<TextContain>
							{data?.messages?.map((m) => (
								<Text key={m.id}>
									{m.from.isMe === true ? (
										<From>
											<FatText text={m.text} />
										</From>
									) : (
										<ToContain>
											<Avatar size="sm" url={m.from.avatar} />
											<To>
												<FatText text={m.text} />
											</To>
										</ToContain>
									)}
								</Text>
							))}
						</TextContain>
						<TextInputContain></TextInputContain>
					</Body>
				</>
			) : (
				<>
					<Body>
						<ButtonContain>
							<Button text={"Send Message"} />
						</ButtonContain>
					</Body>
				</>
			)}
		</Wrapper>
	);
};

export default MessagePresenter;
