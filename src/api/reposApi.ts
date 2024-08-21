import { baseUrl, token } from "../constants";
import { request } from "graphql-request";
import { RepositoriesResponse } from "../models/repo";

class ReposApi {
    async getRepos(
        document: string,
        variables: object
    ): Promise<RepositoriesResponse> {
        return await request({
            url: baseUrl,
            document,
            requestHeaders: {
                Authorization: `Bearer ${token}`,
            },
            variables,
        });
    }
}

export const reposApi = new ReposApi();
