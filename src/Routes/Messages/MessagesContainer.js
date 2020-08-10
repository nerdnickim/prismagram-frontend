import React from "react";
import MessagePresenter from "./MessagesPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEE_ROOMS } from "./MessagesQueries";
import { withRouter } from "react-router-dom";
import Loader from "../../Components/Loader";

export default withRouter(({ location: { state } }) => {
	const { data, loading } = useQuery(SEE_ROOMS);
	return loading ? <Loader /> : <MessagePresenter data={data?.seeRooms} state={state} />;
});
