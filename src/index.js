import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./contexts/auth-context";

import App from "./App";

import "./index.sass";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
