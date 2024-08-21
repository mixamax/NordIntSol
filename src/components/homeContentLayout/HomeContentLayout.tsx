import { Box } from "@mui/material";
import { ReactNode } from "react";
import styles from "./homeContentLayout.module.scss";
type Props = {
    article: ReactNode;
    aside: ReactNode;
};
export function HomeContentLayout({ article, aside }: Props) {
    return (
        <Box display={"flex"} flexGrow={1}>
            <article className={styles.article}>{article}</article>
            <aside className={styles.aside}>{aside}</aside>
        </Box>
    );
}
