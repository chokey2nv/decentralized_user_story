import React from "react";

interface TabPanelProps {
  children: React.ReactElement;
  value: number;
  index: number;
}
export default function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  if (value !== index) return null;
  return <div>{children}</div>;
}
