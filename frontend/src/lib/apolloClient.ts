import {
  ApolloClient,
  InMemoryCache,
  Observable,
  createHttpLink,
  from,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, setAccessToken } from "@/lib/accessToken";
import axios from "axios";

// Create HTTP Link
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

// Create Auth Link
const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Error Link for UNAUTHENTICATED and token refresh
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED") {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return;

        return new Observable((observer) => {
          axios
            .post(import.meta.env.VITE_GRAPHQL_URI, {
              query: `
                mutation RefreshToken($token: String!) {
                  refreshToken(token: $token) {
                    accessToken
                  }
                }
              `,
              variables: { token: refreshToken },
            })
            .then((res) => {
              const newToken = res.data?.data?.refreshToken?.accessToken;
              if (newToken) {
                setAccessToken(newToken);

                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    authorization: `Bearer ${newToken}`,
                  },
                }));

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              } else {
                observer.error(new Error("No new token returned"));
              }
            })
            .catch((err) => {
              console.error("Token refresh failed", err);
              observer.error(err);
            });
        });
      }
    }
  }
});

// Create WebSocket Link
const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_URI,
    connectionParams: () => ({
      authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : "",
    }),
  })
);

// Create Split Link (route based on operation type)
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    );
  },
  wsLink,
  from([errorLink, authLink, httpLink]) // HTTP + error + auth
);

// Create Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
