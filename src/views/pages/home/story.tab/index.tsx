import React from "react";
import { Info } from "@mui/icons-material";
import { Button, FormLabel, Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 10,
  },
  subheader: {
    fontWeight: 400,
    fontSize: 16,
    marginBottom: 20,
  },
  info: {
    display: "flex",
    alignItems: "center",
    color: "#D9AA0F",
    marginBottom: 20,
    marginTop: 10,
  },
  btnContainer: {
    marginTop: 20,
  },
}));
export default function GenerateUserStory({
  username,
  setUsername,
  onContinue,
}: {
  username: string;
  setUsername: (username: string) => void;
  onContinue: React.MouseEventHandler;
}) {
  const classes = useStyle();
  return (
    <Stack>
      <div className={classes.header}>Create Your Story</div>
      <div className={classes.subheader}>
        Our users have their stories, you can create yours as well.
      </div>
      <Stack>
        <FormLabel>Choose Username</FormLabel>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </Stack>
      <div className={classes.info}>
        <Info />
        <span>
          The username you choose will be printed on your generated story.
        </span>
      </div>
      <div className={classes.btnContainer}>
        <Button fullWidth variant="contained" onClick={onContinue}>
          Generate Story
        </Button>
      </div>
    </Stack>
  );
}
