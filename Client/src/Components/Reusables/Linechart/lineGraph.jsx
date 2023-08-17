// import React from "react";
// import {
//   VictoryChart,
//   VictoryScatter,
//   VictoryLine,
//   VictoryLegend,
// } from "victory";

// const LineGraph = ({ data, columns, error }) => {
//   let dataEP = data.map((val) => {
//     return { x: val[columns[0]], y: val[columns[1]] };
//   });
//   let bestFit = data.map((val) => {
//     return { x: val.best_fit_X, y: val.best_fit_Y };
//   });
//   let errorData = data.map((val) => {
//     return { x: val.error_X, y: val.error_Y };
//   });
//   return (
//     <div>
//       {!error ? (
//         <VictoryChart>
//           <VictoryLegend
//             x={50}
//             y={10}
//             orientation="horizontal"
//             gutter={20}
//             data={[
//               { name: "BestFit", symbol: { fill: "orange" } },

//               { name: "Actual", symbol: { fill: "#33E3FF" } },
//             ]}
//             style={{ border: { stroke: "black" } }}
//           />

//           <VictoryScatter
//             data={[...dataEP]}
//             style={{ data: { stroke: "red", fill: "#33E3FF" } }}
//           />

//           <VictoryLine
//             data={[...bestFit]}
//             style={{ data: { stroke: "orange" } }}
//           />
//         </VictoryChart>
//       ) : (
//         <VictoryChart>
//           <VictoryLegend
//             x={50}
//             y={10}
//             orientation="horizontal"
//             gutter={20}
//             data={[{ name: "Error", symbol: { fill: "red" } }]}
//             style={{ border: { stroke: "black" } }}
//           />

//           <VictoryLine
//             data={[...errorData]}
//             style={{ data: { stroke: "red" } }}
//           />
//         </VictoryChart>
//       )}
//     </div>
//   );
// };

// export default LineGraph;
import React from "react";
// import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Line } from "@nivo/line";

const LineGraph = ({ bestFit, actualData, errorData, error }) => {
  const data = [
    {
      id: "Actual",
      data: actualData,
    },
    {
      id: "Bestfit",
      data: bestFit,
    },
  ];
  const Edata = [
    {
      id: "Error",
      data: errorData,
    },
  ];
  return (
    <div>
      {!error ? (
        <div>
          <Line
            data={data}
            margin={{ top: 20, right: 30, bottom: 40, left: 40 }}
            xScale={{ type: "linear", min: "auto", max: "auto" }}
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            curve="natural"
            width={1000}
            height={600}
            yFormat=" >-.2f"
            enablePoints={true}
            enableGridX={true}
            enableGridY={true}
            enableSlices="x"
            enableCrosshair={true}
            colors={["#5B70F3", "#F0A500"]}
          />
        </div>
      ) : (
        <div>
          <Line
            data={Edata}
            margin={{ top: 20, right: 30, bottom: 40, left: 40 }}
            xScale={{ type: "linear", min: "auto", max: "auto" }}
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            curve="natural"
            width={1000}
            height={600}
            yFormat=" >-.2f"
            enablePoints={true}
            enableGridX={true}
            enableGridY={true}
            enableSlices="x"
            enableCrosshair={true}
            colors={["#F35C6E"]}
          />
        </div>
      )}
    </div>
  );
};

export default LineGraph;
