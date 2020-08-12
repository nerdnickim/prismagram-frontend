import { gql } from "@apollo/client";

export const SEE_ROOMS = gql`
	{
		seeRooms {
			id
			participants {
				id
				avatar
				username
			}
		}
	}
`;
