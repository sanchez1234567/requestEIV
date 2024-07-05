import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const requestDivs = document.querySelectorAll(".request-form");

requestDivs.forEach((div) => {
  const root = ReactDOM.createRoot(div);
  root.render(<App url={div.dataset.url} />);
});
