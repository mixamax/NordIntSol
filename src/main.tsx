import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import RTKProvider from "./app/RTKProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RTKProvider>
            <App />
        </RTKProvider>
    </StrictMode>
);
