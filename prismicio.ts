import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import { PrismicDocument } from "@prismicio/types";
import { PreviewData } from "next";
import sm from "./sm.json";

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc: PrismicDocument) {
  switch (doc.type) {
    case "homepage":
      return "/";
    case "page":
      return `/${doc.uid}`;
    default:
      return null;
  }
}

// This factory function allows smooth preview setup
export function getPrismicClient(req?: unknown) {
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    defaultParams: {
      pageSize: 10,
    },
  });

  return client;
}
