import dialogMiddleware from "./dialog.mid";
import noticeMiddleware from "./notice.mid";
import walletMiddleware from "./wallet.mid/indext";
import walletStatMiddleWare from "./wallet.stat.mid";

const appMiddleware = [
  walletMiddleware,
  noticeMiddleware,
  dialogMiddleware,
  walletStatMiddleWare,
];
export default appMiddleware;
