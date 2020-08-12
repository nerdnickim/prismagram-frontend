import React, { useState } from "react";
import MessagePresenter from "./MessagePresenter";
import { useQuery, useMutation } from "@apollo/client";

import { SEE_ROOM, SEND_MESSAGE } from "./MessageQueries";
import useInput from "../../Hooks/useInput";

const MessageContainer = ({ id, toId }) => {
	const { data, loading } = useQuery(SEE_ROOM, { variables: { id } });
	const messageInput = useInput("");
	const [sendMessage] = useMutation(SEND_MESSAGE, {
		variables: { roomId: id, message: messageInput.value, toId },
	});
	const [mArray, setMArray] = useState([]);

	const onKeyPress = async (e) => {
		e.persist();
		const { which } = e;
		if (which === 13) {
			e.preventDefault();
			if (messageInput.value === "") {
				return;
			} else {
				console.log("Enter");
				const { data } = await sendMessage();
				console.log(data);
				messageInput.setValue("");
			}
		}
	};
	return (
		<MessagePresenter
			data={data?.seeRoom}
			loading={loading}
			onKeyPress={onKeyPress}
			messageInput={messageInput}
		/>
	);
};

export default MessageContainer;
