import React from 'react'
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';

const Table = (props) => {
   const dataCfg = {
    fields :{
        columns : props.columns
    },
    data : props.tableData
    };
    const s2Options={
         width:400,
      height:500,
      interaction: {
        hoverHighlight: true,
        selectedCellsSpotlight: true,
      },
      tooltip: {
        showTooltip: true,
      },
    }
    
  return (
    <div>
       <SheetComponent
        sheetType="editable"
        dataCfg={dataCfg}
        options={s2Options}
         themeCfg={{name:"colorful"}}
         adaptive={{
          width: true,
          height: false,
      }}
      />
    </div>
  )
}

export default Table



