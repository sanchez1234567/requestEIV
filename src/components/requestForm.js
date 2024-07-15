import { useState } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import BriefMsg from "./BriefMsg.js";

export default function RequestForm(props) {
  const [info, setInfo] = useState({
    serNo: "",
    email: "",
  });
  const [sendReq, setSendReq] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
  const [butMsg, setButMsg] = useState("Отправить запрос");

  const getNumber = (e) => {
    setInfo((obj) => {
      return { ...obj, serNo: String(e.target.value) };
    });
  };

  const getEmail = (e) => {
    setInfo((obj) => {
      return { ...obj, email: String(e.target.value) };
    });
  };

  const reqVerLink = async () => {
    if (!/^[a-zA-Z0-9]+$/.test(info["serNo"])) {
      setAlertMsg("Серия номер не должны содержать символов");
      setAlertType("warning");
      setShowAlert(true);
      return;
    }
    setSendReq(true);
    setButMsg("Запрос выполняется...");
    try {
      const responseVerLink = await fetch(props.url, {
        signal: AbortSignal.timeout(60000),
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (responseVerLink.ok) {
        const responseInfo = await responseVerLink.json();
        setAlertMsg(responseInfo.resMsg);
        setAlertType(responseInfo.type);
        setSendReq(false);
        setShowAlert(true);
        setButMsg("Повторить запрос");
      }
      if (!responseVerLink.ok && responseVerLink.status === 404) {
        throw new Error("404");
      }
    } catch (err) {
      setButMsg("Повторить запрос");
      handleErr(err);
    }
  };

  const handleErr = (error) => {
    if (String(error).includes("Failed to fetch")) {
      setAlertMsg("Сервер не отвечает");
      setAlertType("error");
      setSendReq(false);
      setShowAlert(true);
      return;
    }
    if (String(error).includes("404")) {
      setAlertMsg("Сервер не отвечает");
      setAlertType("error");
      setSendReq(false);
      setShowAlert(true);
      return;
    }
    if (error.name === "TimeoutError") {
      setAlertMsg("Время ожидания ответа сервера вышло");
      setAlertType("error");
      setSendReq(false);
      setShowAlert(true);
      return;
    } else {
      setAlertMsg("Ошибка запроса");
      setAlertType("error");
      setSendReq(false);
      setShowAlert(true);
      return;
    }
  };

  return (
    <div>
      <Box
        margin="auto"
        sx={{
          border: 0,
          bgcolor: "#f0f4f9",
          pt: 20,
          pb: 20,
          pr: 1,
          pl: 1,
          display: "flex",
          justifyContent: "space-evenly",
          minWidth: "250px",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            minWidth: "250px",
            maxWidth: "700px",
            width: "50%",
            height: "50%",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "700px",
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
                label="Серия номер паспорта"
                id="outlined"
                variant="outlined"
                onChange={getNumber}
              />
              <TextField
                label="Адрес электронной почты"
                id="outlined-basic"
                variant="outlined"
                onChange={getEmail}
              />
              <LoadingButton
                variant="contained"
                color="info"
                loading={sendReq}
                onClick={reqVerLink}
                loadingPosition="end"
                disabled={
                  info["serNo"].length > 0 && info["email"].length > 0
                    ? false
                    : true
                }
              >
                {butMsg}
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
