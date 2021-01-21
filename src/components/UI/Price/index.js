import React from "react";
import { BiDollar } from "react-icons/bi";

import "./style.css";

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}>
      <BiDollar />
      {props.value}
    </div>
  );
};

export default Price;
