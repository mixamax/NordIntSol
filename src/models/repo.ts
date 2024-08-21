export interface RepoDetailsResponse {
    node: RepoDetails;
}
export interface RepoDetails {
    id: string;
    name: string;
    description: string;
    licenseInfo: {
        name: string;
    };
}
export interface Repository {
    id: string;
    name: string;
    primaryLanguage: {
        name: string;
    };
    forkCount: number;
    stargazers: {
        totalCount: number;
    };
    updatedAt: string;
}

interface PageInfo {
    endCursor: string;
    startCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface RepositoriesResponse {
    search: {
        repositoryCount: number;
        nodes: Repository[];
        pageInfo: PageInfo;
    };
}

export interface Repositories {
    repositoryCount: number;
    repositories: Repository[];
}
