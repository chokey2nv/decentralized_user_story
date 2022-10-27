import React from "react";
import ButtonCustom from "views/components/base/button.custom";

export interface ThemeSwitchButtonProps {
  classes: {
    iconButton?: string;
  };
}
export default function ThemeSwitchButton({ classes }: ThemeSwitchButtonProps) {
  return (
    <ButtonCustom
      iconSrc="/assets/moon.svg"
      classes={{
        iconButton: { root: classes.iconButton },
      }}
    />
  );
}
