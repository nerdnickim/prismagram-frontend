import { gql } from "apollo-boost";

export const SEE_ROOM = gql`
	query seeRoom($id: String!) {
		seeRoom(id: $id) {
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
				from {
					id
					isMe
					avatar
					username
				}
				to {
					id
					isMe
					avatar
					username
				}
			}
		}
	}
`;
