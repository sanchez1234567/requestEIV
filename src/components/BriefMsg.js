import { Alert, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function BriefMsg(props) {
  return (
    <Alert
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            props.action(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      severity={props.alertSettings.type}
    >
      {props.alertSettings.msg}
    </Alert>
  );
}
