import { Box } from "@mui/material";
import styles from "./searchResult.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "Название",
        minWidth: 182,
        flex: 1,
        sortable: false,
        headerClassName: styles.headers,
        cellClassName: styles.cell,
    },
    {
        field: "lang",
        headerName: "Язык",
        minWidth: 182,
        flex: 1,
        sortable: false,
        headerClassName: styles.headers,
        cellClassName: styles.cell,
    },
    {
        field: "forkCount",
        headerName: "Число форков",
        // type: "number",
        minWidth: 182,
        flex: 1,
        headerClassName: styles.headers,
        cellClassName: styles.cell,
    },
    {
        field: "starCount",
        headerName: "Число звезд",
        // type: "number",
        minWidth: 182,
        flex: 1,
        headerClassName: styles.headers,
        cellClassName: styles.cell,
    },
    {
        field: "updatedAt",
        type: "date",
        valueGetter: (value) => value && new Date(value),
        headerName: "Дата обновления",
        minWidth: 182,
        flex: 1,
        headerClassName: styles.headers,
        cellClassName: styles.cell,
    },
];

type Row = {
    id: string;
    name: string;
    lang: string;
    forkCount: number;
    starCount: number;
    updatedAt: string;
};

type Props = {
    repos: Row[];
    handleRepoClick: (id: string) => void;
};
export function SearchResults({ repos, handleRepoClick }: Props) {
    return (
        <Box>
            <h1 className={styles.title}>Результаты поиска</h1>
            <div className={styles["table-container"]}>
                <DataGrid
                    hideFooterSelectedRowCount
                    disableColumnMenu
                    onRowClick={(row) => handleRepoClick(row.id as string)}
                    sx={{
                        border: "none",
                        ".MuiDataGrid-iconButtonContainer": {
                            visibility: "visible",
                        },
                        ".MuiDataGrid-sortIcon": {
                            opacity: "inherit !important",
                        },
                        "& .MuiDataGrid-row": {
                            cursor: "pointer",
                        },
                        "& .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        },
                        ".MuiDataGrid-columnHeaderTitle": {
                            fontWeight: "600 !important",
                        },
                        ".MuiDataGrid-footerContainer": {
                            border: "none",
                        },
                        " .MuiDataGrid-columnHeaderTitleContainer": {
                            direction: "rtl",
                            justifyContent: "flex-end",
                        },
                    }}
                    classes={{
                        root: styles["grid-root"],
                    }}
                    rows={repos}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                        // sorting: {
                        //     sortModel: [{ field: "updatedAt", sort: "desc" }],
                        // },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </Box>
    );
}
