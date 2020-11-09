import React from "react";
import styled from "styled-components";
import { Switch, Route, Link } from "react-router-dom";

const Ul = styled.ul`
	position: absolute;
	top: 20px;
	left: 0;
	width: 100px;
	border: 1px solid;
	border-radius: 3px;
	background: white;
`;

const Li = styled.li`
	padding: 10px 0;
	display: flex;
	justify-content: center;
	cursor: pointer;
	a {
		color: black;
	}

	&:hover {
		background: rgba(0, 0, 0, 0.3);
	}
`;

const Div = styled.div``;

const MessagePopUp = ({ toId }) => {
	return (
		<>
			<Ul>
				<Li>
					<Link to={`/message/${toId}/webrtc`}>webRTC</Link>
				</Li>
				<Li>DELETE</Li>
			</Ul>
			<Switch>
				<Route path="/message/:toId/webrtc" component={<Div />} />
			</Switch>
		</>
	);
};

export default MessagePopUp;
