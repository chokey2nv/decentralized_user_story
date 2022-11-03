import React from "react";
import Header from "views/components/views/headers";

export default function AppLayout(props: any) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
