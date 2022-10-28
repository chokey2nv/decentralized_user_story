import dialogMiddleware from "./dialog.mid";
import noticeMiddleware from "./notice.mid";
import walletMiddleware from "./wallet.mid/indext";

const appMiddleware = [walletMiddleware, noticeMiddleware, dialogMiddleware];
export default appMiddleware;
