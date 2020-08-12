import { gql } from "@apollo/client";

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

export const SEND_MESSAGE = gql`
	mutation sendMessage($roomId: String, $message: String, $toId: String!) {
		sendMessage(roomId: $roomId, message: $message, toId: $toId) {
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
`;

export const NEW_MESSAGE = gql`
	subscription newMessage($roomId: String!) {
		newMessage(roomId: $roomId) {
			id
			text
			from {
				id
				avatar
				username
			}
			to {
				id
				avatar
				username
			}
		}
	}
`;
