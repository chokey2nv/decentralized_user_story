import { changeNetworkAction } from "application/flows/actions";
import { hideDialogBoxAction, showDialogAction } from "application/flows/actions/dialogbox.action";
import { useAppDispatch } from "application/hook";
import React from "react";
import ButtonDropdown from "views/components/base/button.custom/button.dropdown";
import NetworkSelector from "./network.selector";

export interface NetworkButtonProps {
  logoName: string | undefined;
  name: string | undefined;
}
export default function NetworkButton({ name, logoName }: NetworkButtonProps) {
  const dispatch = useAppDispatch();
  function onClickHandler() {
    dispatch(
      showDialogAction({
        component: () => <NetworkSelector selectNetwork={selectNetwork}/>,
      })
    );
  }
  function selectNetwork (networkId: string){
    dispatch(changeNetworkAction(networkId));
    dispatch(hideDialogBoxAction);
  };
  return (
    <ButtonDropdown
      onClick={onClickHandler}
      iconSrc={`/assets/networks/${logoName}.svg`}
      text={name as string}
    />
  );
}
