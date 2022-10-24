import React from "react";

export default function AppLayout(props: any) {
  return <div>
    <div>
      This is the layout
    </div>
    {props.children}
  </div>
}
