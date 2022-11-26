import { makeStyles } from "@mui/styles";
import { useAppSelector } from "application/hook";
import { selectWallet } from "application/reducers.slices/wallet.core";
import classNames from "classnames";
import { NETWORKS } from "utils/constance";

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
export function NetworkSelector({
  selectNetwork,
}: {
  selectNetwork: (network: string) => void;
}) {
  const classes = useStyles(),
    { networkId } = useAppSelector(selectWallet);
  return (
    <div className={classes.root}>
      <div className={classes.heading}>Choose a Network to connect to</div>
      {NETWORKS.map((item, index: number) => {
        return (
          <div
            key={index}
            className={classNames(
              networkId === item.id ? classes.selected : "",
              classes.selectBorder
            )}
            onClick={() => selectNetwork(item.id)}
          >
            <img
              src={`/assets/networks/${item.name}.svg`}
              className={classNames(classes.midiumlogo)}
              alt={item.name}
            />
            <div className={classNames(classes.innerText)}>{item.label}</div>
          </div>
        );
      })}
      <div className={classes.inforBox}>
        <div className={classes.inforText}>
          By connecting a wallet, you agree to RigelProtocol’s{" "}
          <a
            target="_blank"
            href="https://www.rigelprotocol.com/terms-and-condition.html"
            rel="noreferrer"
            className={classes.link}
          >
            Terms of Service
          </a>{" "}
          and acknowledge that you have read and understand the RigelProtocol{" "}
          <a
            target="_blank"
            href="https://www.rigelprotocol.com/privacy-policy.html"
            rel="noreferrer"
            className={classes.link}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

export default NetworkSelector;
