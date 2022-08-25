import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { RecoilRoot } from "recoil";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
