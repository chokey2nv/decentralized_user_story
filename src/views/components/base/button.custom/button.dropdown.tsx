import React from "react";
import ButtonCustom from ".";

interface ButtonDropdownProps {
  iconSrc: string;
  text: string;
  onClick: React.MouseEventHandler
}
export default function ButtonDropdown({iconSrc, text, onClick}: ButtonDropdownProps){
  return <ButtonCustom onClick={onClick} iconSrc={iconSrc} text={text} rightIconSrc="/assets/arrow_dropdown.svg"/>
}