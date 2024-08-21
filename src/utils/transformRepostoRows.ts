import { Repository } from "../models/repo";

// Приводим ответ от сервера к нужному виду для таблицы
export const transformRepostoRows = (repos: Repository[]) => {
    return repos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        lang: repo.primaryLanguage?.name,
        forkCount: repo.forkCount,
        starCount: repo.stargazers?.totalCount,
        updatedAt: repo.updatedAt,
    }));
};
