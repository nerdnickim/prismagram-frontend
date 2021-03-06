import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import {
	Compass,
	HeartEmpty,
	User,
	Logo,
	HeartFull,
	Home,
	HomeFull,
	CompassFull,
	UserFull,
	MessageLogo,
	MessageFullLogo,
} from "./Icons";
import { useQuery } from "@apollo/client";
import { ME } from "../SharedQueries";
import Notifications from "../Routes/Notifications";

const Header = styled.header`
	width: 100%;
	border: 0;
	position: fixed;
	top: 0;
	left: 0;
	background-color: white;
	border-bottom: ${(props) => props.theme.boxBorder};
	border-radius: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 25px 0;
	z-index: 2;
`;

const HeaderWrapper = styled.div`
	width: 100%;
	max-width: ${(props) => props.theme.maxWidth};
	display: flex;
	justify-content: center;
`;

const HeaderColumn = styled.div`
	width: 33%;
	text-align: center;
	&:first-child {
		margin-right: auto;
		text-align: left;
	}
	&:last-child {
		margin-left: auto;
		text-align: right;
	}
`;

const SearchInput = styled(Input)`
	background-color: ${(props) => props.theme.bgColor};
	padding: 5px;
	font-size: 14px;
	border-radius: 3px;
	height: auto;
	text-align: center;
	width: 70%;
	&::placeholder {
		opacity: 0.8;
		font-weight: 200;
	}
`;

const HeaderLink = styled.span`
	cursor: pointer;
	&:not(:last-child) {
		margin-right: 30px;
	}
`;

const NotificationBox = styled.div`
	${(props) => props.theme.whiteBox}
	position: absolute;
	width: 400px;
	height: 300px;
	margin-top: 20px;
	overflow-y: scroll;
`;

export default withRouter(({ history, location }) => {
	const search = useInput("");
	const { data, loading } = useQuery(ME);
	let [state, setState] = useState({
		notification: false,
	});

	if (loading) return "";
	const onSearchSubmit = (e) => {
		e.preventDefault();
		history.push(`/search?term=${search.value}`);
	};

	const notificationHandle = (e) => {
		e.persist();
		e.preventDefault();
		if (state.notification === false) {
			setState((prev) => ({
				...prev,
				notification: !state.notification,
			}));
		} else if (state.notification === true) {
			setState((prev) => ({
				...prev,
				notification: false,
			}));
		}
	};

	return (
		<Header>
			<HeaderWrapper>
				<HeaderColumn>
					<Link to="/">
						<Logo />
					</Link>
				</HeaderColumn>
				<HeaderColumn>
					<form onSubmit={onSearchSubmit}>
						<SearchInput
							value={search.value}
							onChange={search.onChange}
							placeholder="Search"
							type="text"
						/>
					</form>
				</HeaderColumn>
				<HeaderColumn>
					<HeaderLink>
						<Link to="/">{location.pathname === "/" ? <HomeFull /> : <Home />}</Link>
					</HeaderLink>
					<HeaderLink>
						<Link to="/explore">
							{location.pathname === "/explore" ? <CompassFull /> : <Compass />}
						</Link>
					</HeaderLink>
					<HeaderLink>
						<Link
							to={{
								pathname: "/message",
								state: {
									meId: data?.me?.id,
								},
							}}
						>
							{location.pathname === "/message" ? <MessageFullLogo /> : <MessageLogo />}
						</Link>
					</HeaderLink>
					<HeaderLink onClick={notificationHandle}>
						{state.notification === true ? <HeartFull /> : <HeartEmpty />}
						{state.notification === true ? (
							<NotificationBox>
								<Notifications />
							</NotificationBox>
						) : null}
					</HeaderLink>
					{!data.me ? (
						<HeaderLink>
							<Link to="/#">
								<User />
							</Link>
						</HeaderLink>
					) : (
						<HeaderLink>
							<Link to={`/profile/${data.me.username}`}>
								{location.pathname === `/profile/${data.me.username}` ? (
									<UserFull />
								) : (
									<User />
								)}
							</Link>
						</HeaderLink>
					)}
				</HeaderColumn>
			</HeaderWrapper>
		</Header>
	);
});
