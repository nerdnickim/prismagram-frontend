import { gql } from "@apollo/client";

export const SEE_ROOMS = gql`
	{
		seeRooms {
			id
			participants {
				id
				isMe
				avatar
				username
			}
			messages {
				id
				text
				to {
					id
					username
					isMe
					avatar
				}
				from {
					id
					username
					isMe
					avatar
				}
			}
		}
	}
`;
