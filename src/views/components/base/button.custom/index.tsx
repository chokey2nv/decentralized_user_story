import { IconButton, IconButtonClasses, styled } from "@mui/material";
import React from "react";

export const StyledIconButton = styled(IconButton)(() => ({
  borderRadius: 6,
  padding: "12px 16px",
  border: "1px solid #F2F5F8",
  gap: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));
export const StyledArrowDropDown = styled("img")(() => ({}));
export const StyledMenuIcon = styled("img")(() => ({
  width: 24,
  height: 24,
}));
export const StyledMenuIconText = styled("span")(() => ({
  fontSfamily: "Cera Pro",
  fontSize: 16,
  fontWeight: 500,
  textAlign: "left",
  color: "black",
}));

interface ButtonCustomProps {
  iconSrc: string;
  text?: string;
  rightIconSrc?: string;
  classes?: {
    iconButton?: Partial<IconButtonClasses>;
  };
  classNames?: {
    imgIcon?: string;
    rightIcon?: string;
  };
}
export default function ButtonCustom({
  iconSrc,
  text,
  rightIconSrc,
  classes,
  classNames,
}: ButtonCustomProps) {
  return (
    <StyledIconButton classes={classes?.iconButton}>
      {iconSrc && (
        <StyledMenuIcon className={classNames?.imgIcon} src={iconSrc} />
      )}
      {text && <StyledMenuIconText>{text}</StyledMenuIconText>}
      {rightIconSrc && (
        <StyledArrowDropDown
          className={classNames?.rightIcon}
          src={rightIconSrc}
          alt="icon"
        />
      )}
    </StyledIconButton>
  );
}
