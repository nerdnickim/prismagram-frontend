/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import MessagePresenter from "./MessagePresenter";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { SEE_ROOM, SEND_MESSAGE, NEW_MESSAGE } from "./MessageQueries";
import useInput from "../../Hooks/useInput";
import { withRouter } from "react-router-dom";

const MessageContainer = withRouter(
	({ match: { params }, location: { state }, history }) => {
		if (state?.roomId === undefined) {
			history.push("/message");
			console.log("ad");
		}
		const ref = useRef();
		const [mArray, setMArray] = useState([]);
		const { data, loading } = useQuery(SEE_ROOM, { variables: { id: state?.roomId } });
		const messageInput = useInput("");
		const [sendMessageMutation, { loading: sendLoading }] = useMutation(SEND_MESSAGE, {
			variables: {
				roomId: state?.roomId,
				message: messageInput.value,
				toId: params.toId,
			},
		});
		const { data: newData, loading: loadingNew, error } = useSubscription(NEW_MESSAGE, {
			variables: { roomId: state?.roomId },
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
				toId={params.toId}
				refS={ref}
			/>
		);
	}
);

export default MessageContainer;
