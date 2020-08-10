import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { EDIT_PROFILE } from "./EditProfileQueries";
import EditProfilePresenter from "./EditProfilePresenter";
import { toast } from "react-toastify";
import axios from "axios";
import { GET_USER } from "../Profile/ProfileContainer";

const EditProfileContainer = ({ avatar: avatarUrl, username }) => {
	const customUsername = useInput("");
	const customFirstName = useInput("");
	const customLastName = useInput("");
	const [avatar, setAvatar] = useState(avatarUrl);

	const [editProfileMutation, { loading }] = useMutation(EDIT_PROFILE, {
		variables: {
			username: customUsername.value,
			firstName: customFirstName.value,
			lastName: customLastName.value,
		},
	});

	const [editAvatarMutation, { loading: loadingA }] = useMutation(EDIT_PROFILE, {
		refetchQueries: () => [{ query: GET_USER, variables: { username } }],
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

	const changeAvatar = (e) => {
		e.persist();
		const fileList = e.target.files;
		let fileReader = new FileReader();
		const formData = new FormData();

		if (fileList.length === 0) {
			return;
		} else {
			fileReader.readAsDataURL(fileList[0]);
			fileReader.onloadend = async function () {
				formData.append("avatar", fileList[0]);
				try {
					const {
						data: { location },
					} = await axios.post("http://localhost:4000/api/avatar", formData, {
						headers: {
							"content-type": "multipart/form-data",
						},
					});

					const {
						data: { editUser },
					} = await editAvatarMutation({
						variables: {
							avatar: location,
						},
					});
					setAvatar(fileReader.result);
					if (editUser.id) {
						toast.success("Change your profile avatar!");
					}
				} catch (e) {
					console.log(e);
				}
			};
		}
	};

	return (
		<EditProfilePresenter
			username={customUsername}
			firstName={customFirstName}
			lastName={customLastName}
			avatar={avatar}
			onSubmit={onSubmit}
			loading={loading}
			loadingA={loadingA}
			changeAvatar={changeAvatar}
		/>
	);
};

export default EditProfileContainer;
