import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { RepoDetails, RepoDetailsResponse } from "../models/repo";
import { token, baseUrl } from "../constants";

export const reposApi = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: baseUrl,
        prepareHeaders: (headers) => {
            headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getRepoDetails: builder.query<RepoDetails, string>({
            query: (id) => ({
                document: gql`
                    query repository($id: ID!) {
                        node(id: $id) {
                            ... on Repository {
                                id
                                name
                                description
                                licenseInfo {
                                    name
                                }
                            }
                        }
                    }
                `,
                variables: {
                    id,
                },
            }),
            transformResponse: (response: RepoDetailsResponse) => response.node,
        }),
    }),
});

export const { useGetRepoDetailsQuery } = reposApi;

//Для получения репозиториев с использованием RTK Query:

// getRepos: builder.query<
//     Repositories,
//     {
//         repoName: string;
//         sortBy?: SortType;
//         rowsPerPage?: number;
//         startCursor?: string;
//         endCursor?: string;
//     }
// >({
//     query: ({
//         repoName,
//         sortBy,
//         rowsPerPage,
//         startCursor,
//         endCursor,
//     }) => ({
//         document: gql`
//             query GetRepos($repoName: String!) {
//                 search(query: $repoName, type: REPOSITORY, first: ${
//                     rowsPerPage || 6
//                 },  ${startCursor ? `after: ${startCursor}` : ""}, ${
//             endCursor ? `before: ${endCursor}` : ""
//         }) {
//                     repositoryCount
//                     nodes {
//                         ... on Repository {
//                             id
//                             name
//                             primaryLanguage {
//                                 name
//                             }
//                             forkCount
//                             stargazers {
//                                 totalCount
//                             }
//                             updatedAt
//                         }
//                     }
//                     pageInfo {
//                         endCursor
//                         startCursor
//                         hasNextPage
//                         hasPreviousPage
//                     }
//                 }
//             }
//         `,
//         variables: {
//             repoName: `${repoName} ${sortBy ? `sort:${sortBy}` : ""}`,
//         },
//     }),
//     transformResponse: (response: RepositoriesResponse) => ({
//         repositoryCount: response.search.repositoryCount,
//         repositories: response.search.nodes,
//         pageInfo: response.search.pageInfo,
//     }),
// }),
