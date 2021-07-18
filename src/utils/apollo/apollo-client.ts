import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

export const uniswapClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    fetch,
  }),
  cache: new InMemoryCache(),
});
