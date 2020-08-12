import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { QUERY } from "../localQuery";
import { resolvers } from "./LocalState";

const cache = new InMemoryCache();

cache.writeQuery({
	query: QUERY,
	data: {
		isLoggedIn: Boolean(localStorage.getItem("token")) || false,
	},
});

const httpLink = new HttpLink({
	uri:
		process.env.NODE_ENV === "development"
			? "http://localhost:4000"
			: "https://cloneinggram-backend.herokuapp.com",
});

const sub = new SubscriptionClient("ws://localhost:4000", {
	reconnect: true,
});

const wsLink = new WebSocketLink(sub);

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	cache,
	link: authLink.concat(httpLink, wsLink),
	resolvers,
});

export default client;
