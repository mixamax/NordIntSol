import { useCallback, useState } from "react";
import { Aside } from "../components/aside/Aside";
import { HomeContentLayout } from "../components/homeContentLayout/HomeContentLayout";
import { PageLayout } from "../components/pageLayout/PageLayout";
import { SearchResults } from "../components/searchResults/SearchResults";
import { Welcome } from "../components/welcome/Welcome";
import { useAppSelector } from "../hooks/rtkHooks";
import { transformRepostoRows } from "../utils/transformRepostoRows";

export default function Home() {
    const { repos, loading } = useAppSelector((state) => state.repos);
    const [activeRepoId, setActiveRepoId] = useState("");

    const handleRepoClick = useCallback((id: string) => {
        setActiveRepoId(id);
    }, []);

    return (
        <PageLayout>
            {loading === "idle" && <Welcome />}
            {loading === "pending" && <h1>Загрузка...</h1>}
            {loading === "succeeded" && (
                <HomeContentLayout
                    article={
                        <SearchResults
                            repos={transformRepostoRows(repos)}
                            handleRepoClick={handleRepoClick}
                        />
                    }
                    aside={<Aside activeRepoId={activeRepoId} />}
                />
            )}
        </PageLayout>
    );
}
