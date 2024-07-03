import { Alert } from "@mui/material";

export default function BriefMsg() {
  return (
    <Alert severity="success" variant="filled">
      Проверочная ссылка отправлена. Проверьте почту.
    </Alert>
  );
}
