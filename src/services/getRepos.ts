import { reposApi } from "../api/reposApi";
import { ClientError, gql } from "graphql-request";
import { Repository } from "../models/repo";

// Запрос для получения репозиториев
const document = gql`
    query GetRepos($repoName: String!, $endCursor: String) {
        search(
            query: $repoName
            type: REPOSITORY
            first: 100
            after: $endCursor
        ) {
            repositoryCount
            nodes {
                ... on Repository {
                    id
                    name
                    primaryLanguage {
                        name
                    }
                    forkCount
                    stargazers {
                        totalCount
                    }
                    updatedAt
                }
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
        }
    }
`;

// Функция для получения всех репозиториев с учетом максимального количества в одном ответе = 100
export const getRepos = async (searchQuery: string) => {
    try {
        let repos: Repository[] = [];
        async function getReposBySearchQuery(
            searchQuery: string,
            endCursor: string
        ) {
            const response = await reposApi.getRepos(document, {
                repoName: searchQuery,
                endCursor,
            });

            repos = [...repos, ...response.search.nodes];

            if (response && response.search.pageInfo.hasNextPage) {
                await getReposBySearchQuery(
                    searchQuery,
                    response.search.pageInfo.endCursor
                );
            }
        }
        await getReposBySearchQuery(searchQuery, "");
        return repos;
    } catch (error) {
        if (error instanceof ClientError) {
            return {
                error: { status: error.response.status, data: error },
            };
        }
        return { error: { status: 500, data: error } };
    }
};
