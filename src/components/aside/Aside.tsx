import styles from "./aside.module.scss";
import { useGetRepoDetailsQuery } from "../../services/getReposDetails";

type Props = {
    activeRepoId: string;
};

export function Aside({ activeRepoId }: Props) {
    const { data, isLoading } = useGetRepoDetailsQuery(activeRepoId);

    if (activeRepoId === "")
        return <h2 className={styles.initView}>{"Выберите репозиторий"}</h2>;
    return (
        <>
            {isLoading && <h2 className={styles.initView}>Загрузка...</h2>}
            {data && (
                <>
                    <h2 className={styles.title}>{data.name || ""}</h2>
                    <p className={styles.license}>{data.description || ""}</p>
                    <span className={styles.license}>
                        {data.licenseInfo?.name || ""}
                    </span>
                </>
            )}
        </>
    );
}
