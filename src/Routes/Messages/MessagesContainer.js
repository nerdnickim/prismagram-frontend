import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import MessagesPresenter from "./MessagesPresenter";
import { useQuery } from "@apollo/client";
import { SEE_ROOMS } from "./MessagesQueries";
import Loader from "../../Components/Loader";

export default withRouter(({ location }) => {
	const { data, loading } = useQuery(SEE_ROOMS);
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [ids, setIds] = useState({
		roomId: "",
		toId: "",
	});

	const partUserHandle = (id, data) => {
		setIds((prev) => ({ ...prev, roomId: id, toId: data.id }));
	};

	useEffect(() => {
		if (location.pathname === "/message") {
			setLoadingBtn(false);
		} else {
			setLoadingBtn(true);
		}
	}, [location.pathname]);

	return loading ? (
		<Loader />
	) : (
		<MessagesPresenter
			data={data?.seeRooms}
			partUserHandle={partUserHandle}
			roomId={ids.roomId}
			toId={ids.toId}
			loadingBtn={loadingBtn}
		/>
	);
});
