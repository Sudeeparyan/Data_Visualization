import React from "react";
import { SheetComponent } from "@antv/s2-react";
import "@antv/s2-react/dist/style.min.css";
/**
 * A reusable Table component to display tabular data.
 * @param {Array} data - An array of objects representing the table rows and columns.
 * @returns {JSX.Element} - The rendered Table element.
 */
const Table = (props) => {
  const dataCfg = {
    fields: {
      columns: props.columns,
    },
    data: props.tableData,
  };
  const s2Options = {
    width: 400,
    height: 650,
    interaction: {
      hoverHighlight: true,
      selectedCellsSpotlight: true,
    },
    tooltip: {
      showTooltip: true,
    },
  };

  return (
    <div>
      <SheetComponent
        sheetType="editable"
        dataCfg={dataCfg}
        options={s2Options}
        themeCfg={{ name: "colorful" }}
        adaptive={{
          width: true,
          height: false,
        }}
      />
    </div>
  );
};

export default Table;
