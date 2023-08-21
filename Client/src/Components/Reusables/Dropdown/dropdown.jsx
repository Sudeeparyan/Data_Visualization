import React from "react";
import { Select } from "antd";

const Dropdown = ({ defaultValue, options, width, onchange }) => (
  <Select
    labelInValue
    defaultValue={{
      value: defaultValue,
      label: defaultValue,
    }}
    style={{
      width: width,
    }}
    // onChange={onchange}
    options={[
      {
        value: "jack",
        label: "Jack (100)",
      },
      {
        value: "lucy",
        label: "Lucy (101)",
      },
    ]}
  />
);

export default Dropdown;
