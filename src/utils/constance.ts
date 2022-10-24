import { Network } from "./types"
export const APP_NAME = 'user_story'
export const LOCAL_STORAGE_PARAMS = {
  wallet : `${APP_NAME}_wallet`,
  address : `${APP_NAME}_address`,
  networkId : `${APP_NAME}_networkId`,
}
/**
 * networkList : [{
        networkId : 56,
        name : getNetNames(56),
        image : "/header/bnb.png"
    }, {
        networkId : 97,
        name : getNetNames(97),
        image : "/header/bnb.png"
    }, {
        networkId : 137,
        name : getNetNames(137),
        image : "/assets/polygon.png"
    }, {
        networkId : 80001,
        name : getNetNames(80001),
        image : "/assets/polygon.png"
    }],
 */
export const NETWORKS : Network[] = [
  {
    name: "Binance",
    id: '56',
    symbol: 'BNB',
    decimals: 18
  },{
    name: "Binance Test",
    id: '97',
    symbol: 'BNB',
    decimals: 18
  },{
    name: "Polygon",
    id: '137',
    symbol: 'MATIC',
    decimals: 18
  },{
    name: "Polygon Test",
    id: '80001',
    symbol: 'MATIC',
    decimals: 18
  }
]