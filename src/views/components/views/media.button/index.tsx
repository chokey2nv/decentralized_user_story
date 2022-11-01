import React, { useState } from "react";
import ButtonCustom from "views/components/base/button.custom";
import SocialMediaMenu from "./menu";

export interface MediaButtonProps {
  classes: {
    iconButton: string;
  };
}
export default function MediaButton({ classes }: MediaButtonProps) {
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  return (
    <>
      <ButtonCustom
        iconSrc="/assets/more.svg"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        classes={{
          iconButton: { root: classes.iconButton },
        }}
      />

      <SocialMediaMenu
        anchorEl={anchorEl}
        handleCloseEvent={() => setAnchorEl(undefined)}
      />
    </>
  );
}
