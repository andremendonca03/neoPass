import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_CMS_URL,
  cache: new InMemoryCache(),
})
