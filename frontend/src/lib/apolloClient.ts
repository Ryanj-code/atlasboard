import {
  ApolloClient,
  InMemoryCache,
  Observable,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken, setAccessToken } from "@/lib/accessToken";
import axios from "axios";

// Create normal HTTP link
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

// Auth link to attach accessToken
const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Error link to handle UNAUTHENTICATED
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

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
