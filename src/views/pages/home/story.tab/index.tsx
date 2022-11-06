import React from "react";
import { Info } from "@mui/icons-material";
import { Button, FormLabel, Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getStatWalletTokenOnFirstTx,
  getStatWalletTxCount,
} from "application/flows/actions/wallet.stat.action";
import { useAppDispatch } from "application/hook";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {},
  subheader: {},
  info: {
    display: "flex",
    alignItems: "center",
    color: "#D9AA0F",
  },
  btnContainer: {
    marginTop: 20,
  },
}));
export default function GenerateUserStory() {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const generateStory = () => {
    dispatch(getStatWalletTxCount);
    dispatch(getStatWalletTokenOnFirstTx);
  };
  return (
    <Stack>
      <div className={classes.header}>Create Your Story</div>
      <div className={classes.subheader}>
        Our users have their stories, you can create yours as well.
      </div>
      <Stack>
        <FormLabel>Choose Username</FormLabel>
        <TextField />
      </Stack>
      <div className={classes.info}>
        <Info />
        <span>
          The username you choose will be printed on your generated story.
        </span>
      </div>
      <div className={classes.btnContainer}>
        <Button fullWidth variant="contained" onClick={generateStory}>
          Generate Story
        </Button>
      </div>
    </Stack>
  );
}
