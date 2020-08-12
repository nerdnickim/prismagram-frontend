import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import MessagesPresenter from "./MessagesPresenter";
import { useQuery } from "@apollo/client";
import { SEE_ROOMS } from "./MessagesQueries";
import Loader from "../../Components/Loader";

export default withRouter(() => {
	const { data, loading } = useQuery(SEE_ROOMS);
	const [ids, setIds] = useState({
		roomId: "",
		toId: "",
	});

	const partUserHandle = (id, data) => {
		setIds((prev) => ({ ...prev, roomId: id, toId: data.id }));
	};

	return loading ? (
		<Loader />
	) : (
		<MessagesPresenter
			data={data?.seeRooms}
			partUserHandle={partUserHandle}
			roomId={ids.roomId}
			toId={ids.toId}
		/>
	);
});
