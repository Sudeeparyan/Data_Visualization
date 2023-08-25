import React from "react";
import { Select } from "antd";

const Dropdown = ({ defaultValue, options, width, handleChange }) => (
  <Select
    labelInValue
    defaultValue={{
      value: defaultValue,
      label: defaultValue,
    }}
    showSearch
    style={{
      width: width,
    }}
    onChange={handleChange}
    options={options}
  />
);

export default Dropdown;
