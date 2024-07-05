import RequestForm from "./components/RequestForm.js";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

export default function App(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <RequestForm url={props.url} />
    </React.Fragment>
  );
}
