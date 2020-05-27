import React from "react";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { EDIT_PROFILE } from "./EditProfileQueries";
import EditProfilePresenter from "./EditProfilePresenter";
import { toast } from "react-toastify";

const EditProfileContainer = () => {
	const customUsername = useInput("");
	const customFirstName = useInput("");
	const customLastName = useInput("");

	const [editProfileMutation] = useMutation(EDIT_PROFILE, {
		variables: {
			username: customUsername.value,
			firstName: customFirstName.value,
			lastName: customLastName.value,
		},
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		if (
			customUsername.value !== "" &&
			customFirstName.value !== "" &&
			customLastName.value !== ""
		) {
			const {
				data: { editUser },
			} = await editProfileMutation();
			if (editUser) {
				toast.success("Confirm your profile");
			}
		}
	};

	return (
		<EditProfilePresenter
			username={customUsername}
			firstName={customFirstName}
			lastName={customLastName}
			onSubmit={onSubmit}
		/>
	);
};

export default EditProfileContainer;
