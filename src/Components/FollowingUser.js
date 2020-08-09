import React from "react";
import styled from "styled-components";
import FatText from "./FatText";
import Avatar from "./Avatart";

const Wrapper = styled.div`
	${(props) => props.theme.whiteBox};
	user-select: none;
	display: flex;
	width: 100%;
	max-width: 600px;
	height: 100px;
	a {
		color: inherit;
	}
	margin-bottom: 25px;
`;

const UserContain = styled.div`
	width: 65px;
	height: 80px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px 0;
	padding: 0 40px;
`;

export default ({ data }) => {
	return (
		<Wrapper>
			{data.map((u) => (
				<UserContain key={u.id}>
					<Avatar size="md" url={u.avatar} />
					<FatText text={u.username} />
				</UserContain>
			))}
		</Wrapper>
	);
};
