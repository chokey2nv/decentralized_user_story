import AppInfrastructure, { Infra } from "infrastructure";
import { LOCAL_STORAGE_PARAMS } from "utils/constance";
import { Wallets } from "utils/types";

export async function validateInfra(infra: Promise<Infra>) {
  let appInfra: Infra = await infra;
  if (!appInfra) {
    appInfra = (await AppInfrastructure.getInfrastructure(
      localStorage.getItem(LOCAL_STORAGE_PARAMS.wallet) as Wallets
    )) as Infra;
  }
  return appInfra;
}
