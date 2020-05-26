import { gql } from "apollo-boost";

export const EDIT_PROFILE = gql`
	mutation editUser(
		$username: String
		$firstName: String
		$lastName: String
		$avatar: String
	) {
		editUser(
			username: $username
			firstName: $firstName
			lastName: $lastName
			avatar: $avatar
		)
	}
`;
