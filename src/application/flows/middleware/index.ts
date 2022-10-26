import noticeMiddleware from "./notice.mid";
import walletMiddleware from "./wallet.mid/indext";

const appMiddleware = [walletMiddleware, noticeMiddleware];
export default appMiddleware;
