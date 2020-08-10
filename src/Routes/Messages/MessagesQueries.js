import { gql } from "apollo-boost";

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
