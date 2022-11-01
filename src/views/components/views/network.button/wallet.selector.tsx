import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { WALLETS } from "utils/constance";
import { Wallets } from "utils/types";

const useStyles = makeStyles(() => ({
  midiumlogo: {
    height: 24,
    width: 24,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: "3rem",
    maxWidth: 400,
  },
  innerText: {
    fontWeight: 400,
    fontSize: "1rem",
    color: "black",
    lineHeight: "1.5rem",
    marginLeft: "0.5rem",
  },
  heading: {
    fontWeight: 400,
    fontSize: "1.25rem",
    color: "black",
    lineHeight: "1.75rem",
    marginBottom: "1rem",
  },
  selectBorder: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: "transparent",
    cursor: "pointer",
    border: `1px solid`,
    "&:hover": {
      border: `1px solid `,
    },
    boxSizing: "border-box",
    borderRadius: ".375rem",
    height: "4rem",
    padding: "1rem",
    marginBottom: "1rem",
  },
  inforBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    border: `1px solid`,
    boxSizing: "border-box",
    borderRadius: ".375rem",
    padding: "1rem",
    marginBottom: "1.5rem",
  },
  inforText: {
    fontWeight: 400,
    fontSize: ".75rem",
    color: "black",
    lineHeight: "1.25rem",
    marginBottom: "1rem",
  },
  link: {
    color: "black",
  },
  selected: {
    border: `solid 2px green`,
  },
}));
export function WalletSelector({
  onWalletSelect,
}: {
  onWalletSelect: (wallet: Wallets) => void;
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.heading}>Choose a Network to connect to</div>
      {WALLETS.map((item, index: number) => {
        return (
          <div
            key={index}
            className={classes.selectBorder}
            onClick={() => onWalletSelect(item.name)}
          >
            <img
              src={`/assets/wallets/${item.name}.svg`}
              className={classNames(classes.midiumlogo)}
              alt={item.name}
            />
            <div className={classNames(classes.innerText)}>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default WalletSelector;
