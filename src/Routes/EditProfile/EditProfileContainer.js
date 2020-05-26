import React from "react";
import EditProfilePresenter from "./EditProfilePresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { EDIT_PROFILE } from "./EditProfileQueries";

const EditProfileContainer = ({ username, firstName, lastName }) => {
	const customUsername = useInput("");
	const customFirstName = useInput("");
	const customLastName = useInput("");

	const [editProfileMutation] = useMutation(EDIT_PROFILE, {
		variables: {
			username: username.value,
			firstName: firstName.value,
			lastName: lastName.value,
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<EditProfilePresenter
			username={username}
			firstName={firstName}
			lastName={lastName}
			onSubmit={onSubmit}
		/>
	);
};

export default EditProfileContainer;
