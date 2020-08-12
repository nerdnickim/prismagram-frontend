import React, { useState } from "react";
import MessagePresenter from "./MessagesPresenter";
import { useQuery } from "@apollo/client";
import { SEE_ROOMS } from "./MessagesQueries";
import { withRouter } from "react-router-dom";
import Loader from "../../Components/Loader";

export default withRouter(({ location: { state } }) => {
	const { data, loading } = useQuery(SEE_ROOMS);
	const [ids, setIds] = useState({
		userId: "",
		toId: "",
	});

	const partUserHandle = (id, data) => {
		setIds((prev) => ({ ...prev, userId: id, toId: data.id }));
	};

	return loading ? (
		<Loader />
	) : (
		<MessagePresenter
			data={data?.seeRooms}
			state={state.meId}
			partUserHandle={partUserHandle}
			id={ids.userId}
			toId={ids.toId}
		/>
	);
});
