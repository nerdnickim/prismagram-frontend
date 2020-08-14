import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loading from "../../Components/Loading";
import Avatar from "../../Components/Avatart";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-autosize-textarea/lib";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const Header = styled.header`
	width: 100%;
	max-height: 80px;
	height: 100%;
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

const TextContain = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-height: 600px;
	height: 100%;
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
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TextArea = styled(TextareaAutosize)`
	border: none;
	width: 100%;
	font-size: 14px;
	resize: none;
	&:focus {
		outline: none;
	}
`;

const MessagePresenter = ({
	data,
	loading,
	onKeyPress,
	messageInput,
	messages,
	toId,
	sendLoading,
	refS,
}) => {
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
						<TextContain ref={refS}>
							{data?.messages?.map((m) => (
								<Text key={m.id}>
									{m.from.isMe === false ? (
										<ToContain>
											<Avatar size="sm" url={m.from.avatar} />
											<To>
												<FatText text={m.text} />
											</To>
										</ToContain>
									) : (
										<From>
											<FatText text={m.text} />
										</From>
									)}
								</Text>
							))}
							{messages.map((m) => (
								<Text key={m.id}>
									{m.to.id === toId ? (
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
						<TextInputContain>
							{sendLoading ? (
								<Loading />
							) : (
								<TextArea
									placeholder="Input message ..."
									onKeyPress={onKeyPress}
									value={messageInput.value}
									onChange={messageInput.onChange}
								/>
							)}
						</TextInputContain>
					</Body>
				</>
			) : null}
		</Wrapper>
	);
};

export default MessagePresenter;
