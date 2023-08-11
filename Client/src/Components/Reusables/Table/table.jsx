import React, { useRef, findDOMNode } from "react";
import { SheetComponent } from "@antv/s2-react";
import "@antv/s2-react/dist/style.min.css";
/**
 * A reusable Table component to display tabular data.
 * @param {Array} data - An array of objects representing the table rows and columns.
 * @returns {JSX.Element} - The rendered Table element.
 */
const Table = ({ columns, tableData }) => {
  const dataCfg = {
    fields: {
      columns: columns,
    },
    data: tableData,
  };

  const sheetRef = useRef();

  const handleScroll = (event) => {
    const sheetInstance = sheetRef.current;
    if (event.scrollY === sheetInstance.facet.vScrollBar.scrollTargetMaxOffset)
      console.log("END");
  };

  const s2Options = {
    width: 400,
    height: 600,
    interaction: {
      hoverHighlight: true,
      selectedCellsSpotlight: true,
    },
  };

  return (
    <div>
      <SheetComponent
        sheetType="table"
        dataCfg={dataCfg}
        ref={sheetRef}
        options={s2Options}
        themeCfg={{ name: "colorful" }}
        adaptive={{
          width: true,
          height: true,
        }}
        onScroll={handleScroll}
      />
    </div>
  );
};

export default Table;
