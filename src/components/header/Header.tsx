import Box from "@mui/material/Box";
import styles from "./header.module.scss";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/rtkHooks";
import { fetchReposBySearchQuery } from "../../store/reposSlice";

export function Header() {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) return;
        dispatch(fetchReposBySearchQuery(value));
        setValue("");
    };
    return (
        <Box className={styles["header-container"]}>
            <Box component="form" onSubmit={(e) => onSubmit(e)}>
                <Input
                    disableUnderline
                    classes={{
                        root: styles["header-input"],
                        input: styles["header-input_input"],
                    }}
                    placeholder="Введите поисковый запрос"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ height: "42px" }}
                >
                    Искать
                </Button>
            </Box>
        </Box>
    );
}
