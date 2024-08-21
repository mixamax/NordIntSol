import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "./reposSlice";
import { reposApi } from "../services/getReposDetails";

export const store = configureStore({
    reducer: {
        repos: reposReducer,
        [reposApi.reducerPath]: reposApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(reposApi.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
