import React from "react";
//Imports from Nivo Library
import Plot from "react-plotly.js";

/**
 * LineGraph component displays a line chart using Nivo Library.
 *
 * @component
 * @param {Array} bestFit - Data for the "Bestfit" line on the graph.
 * @param {Array} actualData - Data for the "Actual" line on the graph.
 * @param {Array} errorData - Data for the "Error" line on the error graph.
 * @param {boolean} error - Indicates whether the graph is an error graph.
 */

const LineGraph = ({
  bestFit,
  actualData,
  errorData,
  error,
  x,
  y,
  errorCutoff,
}) => {
  const xValuesActual = actualData.map((item) => item.x);
  const yValuesActual = actualData.map((item) => item.y);
  const xValuesBestfit = bestFit.map((item) => item.x);
  const yValuesbestfit = bestFit.map((item) => item.y);
  const xValuesError = errorData.map((item) => item.x);
  const yValuesError = errorData.map((item) => item.y);

  return (
    <div>
      {!error ? (
        <div>
          <Plot
            data={[
              {
                x: xValuesActual,
                y: yValuesActual,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "blue" },
                name: "Actual",
              },
              {
                x: xValuesBestfit,
                y: yValuesbestfit,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "orange" },
                name: "BestFit",
              },
            ]}
            layout={{
              width: 1220,
              height: 540,
              title: "Actual Plot",
              xaxis: {
                title: x,
              },
              yaxis: {
                title: y,
              },
            }}
          />
        </div>
      ) : (
        <Plot
          data={[
            {
              x: xValuesError,
              y: yValuesError,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
              name: "Error",
            },
            {
              x: errorCutoff[0].x,
              y: errorCutoff[1].y, // Set the y-values to the desired cutoff line value
              mode: "lines",
              fill: "tozeroy",
              type: "scatter",
              name: "Tolerance",
              line: {
                color: "#8FECC8", // Customize the color of the cutoff line
              },
            },
          ]}
          layout={{
            width: 1220,
            height: 540,
            title: "Error Plot",
            xaxis: {
              title: y,
            },
            yaxis: {
              title: "Error",
            },
          }}
        />
      )}
    </div>
  );
};

export default LineGraph;
