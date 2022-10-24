import { NETWORKS } from "utils/constance";

export interface Infra {
  supportedIds: string[],
  log: typeof console.log
}
const infra = {
  supportedIds : [...NETWORKS.map(item => item.id)],
  log: console.log
}
export default infra;