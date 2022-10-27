import React from "react";
import ButtonCustom from ".";

interface ButtonDropdownProps {
  iconSrc: string;
  text: string;
}
export default function ButtonDropdown({iconSrc, text}: ButtonDropdownProps){
  return <ButtonCustom iconSrc={iconSrc} text={text} rightIconSrc="/assets/arrow_dropdown.svg"/>
}