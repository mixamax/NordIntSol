import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRepos } from "../services/getRepos";
import { Repository } from "../models/repo";

export interface ReposState {
    repos: Repository[];
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ReposState = {
    repos: [],
    loading: "idle",
} satisfies ReposState;

export const fetchReposBySearchQuery = createAsyncThunk(
    "repos/fetchReposBySearchQuery",
    async (searchQuery: string, thunkAPI) => {
        const response = await getRepos(searchQuery);
        if ("error" in response) {
            return thunkAPI.rejectWithValue(response);
        }
        return response;
    }
);

export const reposSlice = createSlice({
    name: "repos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReposBySearchQuery.fulfilled, (state, action) => {
                state.repos = action.payload;
                state.loading = "succeeded";
            })
            .addCase(fetchReposBySearchQuery.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchReposBySearchQuery.rejected, (state) => {
                state.loading = "failed";
                state.repos = [];
            });
    },
});

export default reposSlice.reducer;
