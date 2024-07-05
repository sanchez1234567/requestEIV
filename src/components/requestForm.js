import { useState } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Item from "./Item.js";
import BriefMsg from "./BriefMsg.js";
import RequestEIV from "../functions/RequestEIV.js";

export default function RequestForm(props) {
  const [info, setInfo] = useState({
    number: "",
    email: "",
  });
  const [sendReq, setSendReq] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);

  const getNumber = (e) => {
    setInfo((obj) => {
      return { ...obj, number: e.target.value };
    });
  };

  const getEmail = (e) => {
    setInfo((obj) => {
      return { ...obj, email: e.target.value };
    });
  };

  // const check = () => {
  //   setTimeout(() => setShowAlert(true), 5000);
  // };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          border: 0,
          bgcolor: "#f0f4f9",
          pt: 20,
          pb: 20,
          pr: 1,
          pl: 1,
          display: "flex",
          justifyContent: "center",
          minWidth: "250px",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ minWidth: "250px", width: "50%", height: "50%" }}>
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "750px",
              bgcolor: "#FFFFFF",
              p: 2,
              mb: 2,
              borderRadius: 5,
            }}
          >
            <Stack spacing={2} align="center">
              <Typography variant="h6" gutterBottom>
                Запрос единого идентификатора ВУЗа
              </Typography>
              <TextField
                id="outlined-basic"
                label="Номер, серия паспорта"
                variant="outlined"
                onChange={getNumber}
              />
              <TextField
                id="outlined-basic"
                label="Адрес электронной почты"
                variant="outlined"
                onChange={getEmail}
              />
              <LoadingButton
                variant="contained"
                color="info"
                loading={sendReq}
                onClick={() => RequestEIV(props.url, setSendReq, info)}
              >
                Отправить запрос
              </LoadingButton>
            </Stack>
          </Box>
          {showAlert ? (
            <BriefMsg
              alertSettings={{ msg: alertMsg, type: alertType }}
              action={setShowAlert}
            />
          ) : null}
        </Box>
      </Box>
    </div>
  );
}
