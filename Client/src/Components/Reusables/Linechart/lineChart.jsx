import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
const Linechart = ({ data, line1, line2, error, columns }) => {
  return (
    // <div>
    <ResponsiveContainer width="90%" height="90%">
      {!error ? (
        <div>
          <LineChart
            width={480}
            height={270}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
          >
            <Brush height={10}></Brush>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey={line1} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              dataKey={line2}
              type="monotone"
              stroke={"#00AD7C"}
              name="BestFit Line"
              activeDot={{ r: 8 }}
            />
            <XAxis dataKey={columns[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              dataKey={columns[1]}
              type="monotone"
              stroke={"#C238B5"}
              activeDot={{ r: 8 }}
              name="Actual Data"
            />
          </LineChart>
        </div>
      ) : (
        <div>
          <LineChart
            width={480}
            height={270}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
          >
            <Brush height={10} />
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey={line1} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              dataKey={line2}
              type="monotone"
              stroke={"#F73859"}
              name="Error"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      )}
    </ResponsiveContainer>
    // </div>
  );
};

export default Linechart;
