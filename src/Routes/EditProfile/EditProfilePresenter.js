import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import FatText from "../../Components/FatText";
import Loading from "../../Components/Loading";
import Avatar from "../../Components/Avatart";

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

const Body = styled.div`
	display: flex;
`;

const Section = styled.div`
	width: 60%;
	margin: 10px 0 0 10px;
	form {
		display: flex;
		flex-direction: column;
	}
`;

const AvatarSelect = styled.div`
	width: 35%;
	justify-content: center;
	display: flex;
	cursor: pointer;
	input[type="file"] {
		display: none;
	}
`;

export default ({
	username,
	firstName,
	lastName,
	onSubmit,
	loading,
	loadingA,
	avatar,
	changeAvatar,
}) => {
	return (
		<Wrapper>
			<CustomBox>
				<Header>
					<FatText text={"Custom"} />
				</Header>
				<Body>
					<Section>
						<form onSubmit={onSubmit}>
							<Input placeholder={"User Name"} required {...username} type="text" />
							<Input placeholder={"First Name"} {...firstName} type="text" />
							<Input placeholder={"Last Name"} {...lastName} type="text" />
							{loading ? <Loading /> : <Button text={"Submit"} />}
						</form>
					</Section>
					<AvatarSelect>
						<label htmlFor="avatar-img">
							{loadingA ? <Loading /> : <Avatar size="lg" url={avatar} />}
						</label>
						<input type="file" id="avatar-img" accept="image/*" onChange={changeAvatar} />
					</AvatarSelect>
				</Body>
			</CustomBox>
		</Wrapper>
	);
};
