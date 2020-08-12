import React, { useState, useEffect } from "react";
import MessagePresenter from "./MessagePresenter";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

import { SEE_ROOM, SEND_MESSAGE, NEW_MESSAGE } from "./MessageQueries";
import useInput from "../../Hooks/useInput";

const MessageContainer = ({ toId, roomId }) => {
	const [mArray, setMArray] = useState([]);
	const { data, loading } = useQuery(SEE_ROOM, { variables: { id: roomId } });
	const messageInput = useInput("");
	const [sendMessageMutation, { loading: sendLoading }] = useMutation(SEND_MESSAGE, {
		variables: { roomId, message: messageInput.value, toId },
	});
	const { data: newData, loading: loadingNew, error } = useSubscription(NEW_MESSAGE, {
		variables: { roomId },
	});

	const onKeyPress = async (e) => {
		e.persist();
		const { which } = e;
		if (which === 13) {
			e.preventDefault();
			if (messageInput.value === "") {
				return;
			} else {
				await sendMessageMutation();

				messageInput.setValue("");
			}
		}
	};

	const messageHandle = () => {
		if (loadingNew) {
			console.log(loadingNew);
		}
		if (error) {
			console.log(error);
		}
		if (newData) {
			const { newMessage } = newData;
			if (newMessage === null) {
				return;
			} else {
				if (newMessage.length === 0) {
					return;
				} else {
					setMArray((prev) => [...prev, newMessage]);
				}
			}
		}
	};

	useEffect(() => {
		messageHandle();
	}, [newData]);

	return (
		<MessagePresenter
			data={data?.seeRoom}
			loading={loading}
			sendLoading={sendLoading}
			onKeyPress={onKeyPress}
			messageInput={messageInput}
			messages={mArray}
			toId={toId}
		/>
	);
};

export default MessageContainer;
