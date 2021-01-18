import React from "react";
import { useTest } from "./test-hook";

export function InnerComponent(props: any) {
  const { str, setStr } = useTest();
  return (
    <>
      <div>{str}</div>
      <button onClick={() => setStr('bye')}>bye</button>
    </>
  )
}
