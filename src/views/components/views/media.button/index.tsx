import React from "react";
import ButtonCustom from "views/components/base/button.custom";

export interface MediaButtonProps {
  classes: {
    iconButton: string;
  };
}
export default function MediaButton({ classes }: MediaButtonProps) {
  return (
    <ButtonCustom
      iconSrc="/assets/more.svg"
      classes={{
        iconButton: { root: classes.iconButton },
      }}
    />
  );
}
