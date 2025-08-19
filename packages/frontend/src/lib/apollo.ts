import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";

const httpLink = new HttpLink({
  uri: "http://localhost:3333/local/desafio",
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("authToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );

      if (
        message.includes("Unauthorized") ||
        message.includes("Invalid token")
      ) {
        Cookies.remove("authToken");
        window.location.href = "/login";
      }
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);

    if ("statusCode" in networkError && networkError.statusCode === 401) {
      Cookies.remove("authToken");
      window.location.href = "/login";
    }
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          currentUser: {
            merge: true,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export const clearApolloCache = () => {
  apolloClient.clearStore();
};
