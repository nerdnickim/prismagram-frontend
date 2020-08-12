import { gql } from "@apollo/client";

export const QUERY = gql`
	{
		isLoggedIn @client
	}
`;
