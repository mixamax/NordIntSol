import { ReactNode } from "react";
import { Header } from "../header/Header";
import styles from "./pageLayout.module.scss";
import { Box } from "@mui/material";
import Footer from "../footer/Footer";

type Props = {
    children: ReactNode;
};

export function PageLayout({ children }: Props) {
    return (
        <Box className={styles.layout}>
            <Header />
            <main className={styles.content}>{children}</main>
            <Footer />
        </Box>
    );
}
