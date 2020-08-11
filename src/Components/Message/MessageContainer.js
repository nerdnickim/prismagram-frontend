import React from "react";
import MessagePresenter from "./MessagePresenter";
import { useQuery } from "react-apollo-hooks";

import { SEE_ROOM } from "./MessageQueries";

const MessageContainer = ({ id }) => {
	const { data, loading } = useQuery(SEE_ROOM, { variables: { id } });
	return <MessagePresenter data={data?.seeRoom} loading={loading} />;
};

export default MessageContainer;
