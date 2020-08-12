import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
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

const wsLink = new WebSocketLink({
	uri:
		process.env.NODE_ENV === "development"
			? "ws://localhost:4000"
			: "ws://cloneinggram-backend.herokuapp.com",
	options: {
		reconnect: true,
	},
});

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
	resolvers,
	link: ApolloLink.from([
		authLink,
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				);
			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return (
					definition.kind === "OperationDefinition" &&
					definition.operation === "subscription"
				);
			},
			wsLink,
			httpLink
		),
	]),
});

export default client;
