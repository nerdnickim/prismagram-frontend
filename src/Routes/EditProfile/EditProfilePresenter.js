import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import FatText from "../../Components/FatText";

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

const CustomBox = styled.div`
	${(props) => props.theme.whiteBox};
	position: relative;
	width: 600px;
	height: 400px;
	overflow-y: scroll;
`;

const Header = styled.header`
	font-size: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 0;
`;

const Section = styled.div`
	form {
		display: flex;
		flex-direction: column;
	}
`;

export default ({ username, firstName, lastName, onSubmit }) => {
	return (
		<Wrapper>
			<CustomBox>
				<Header>
					<FatText text={"Custom"} />
				</Header>
				<Section>
					<form onSubmit={onSubmit}>
						<Input placeholder={"User Name"} required {...username} />
						<Input placeholder={"First Name"} {...firstName} />
						<Input placeholder={"Last Name"} {...lastName} />
						<Button text={"Submit"} />
					</form>
				</Section>
			</CustomBox>
		</Wrapper>
	);
};
