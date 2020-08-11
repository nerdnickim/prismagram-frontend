import React, { useState } from "react";
import MessagePresenter from "./MessagesPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEE_ROOMS } from "./MessagesQueries";
import { withRouter } from "react-router-dom";
import Loader from "../../Components/Loader";

export default withRouter(({ location: { state } }) => {
	const { data, loading } = useQuery(SEE_ROOMS);
	const [userId, setUserId] = useState("");

	const partUserHandle = (id) => {
		setUserId((prev) => (prev = id));
	};

	return loading ? (
		<Loader />
	) : (
		<MessagePresenter
			data={data?.seeRooms}
			state={state.meId}
			partUserHandle={partUserHandle}
			id={userId}
		/>
	);
});
