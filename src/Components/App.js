import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";
import { QUERY } from "../localQuery";

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: ${(props) => props.theme.maxWidth};
	width: 100%;
`;

export default () => {
	const {
		data: { isLoggedIn },
	} = useQuery(QUERY);

	return (
		<Fragment>
			<ThemeProvider theme={Theme}>
				<>
					<GlobalStyles />
					<Router>
						<>
							{isLoggedIn && <Header />}
							<Wrapper>
								<Routes isLoggedIn={isLoggedIn} />
								<Footer />
							</Wrapper>
						</>
					</Router>
					<ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
				</>
			</ThemeProvider>
		</Fragment>
	);
};
