import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { AssetAllocation } from "../../../../../types/dr-vault";
import { SiteContext } from "../../../../site-context/site-context";
import { Colors } from "../../design-tokens/colors";
import styles from "./allocation-pie-chart.styles";

const colorArrayLightMode = [Colors.Black, Colors.MidGrey, Colors.BorderGrey];
const colorArrayDarkMode = [
  Colors.White,
  Colors.MidGrey,
  Colors.DarkModeBorderGrey,
];

interface AllocationPieChartProps {
  allocations: AssetAllocation[];
}

const AllocationPieChart: React.FC<AllocationPieChartProps> = ({
  allocations,
}) => {
  const { isDarkMode } = React.useContext(SiteContext);
  const colors = isDarkMode ? colorArrayDarkMode : colorArrayLightMode;

  return (
    <div>
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            outerRadius={75}
            innerRadius={45}
            data={allocations}
            dataKey="percentage"
            nameKey="name"
            labelLine={false}
            strokeWidth={0}
          >
            {allocations.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div css={styles.legendContainer}>
        {allocations.map((asset, index) => (
          <div key={asset.name} css={styles.legendItem}>
            <div
              css={[
                styles.indicator,
                { backgroundColor: colors[index % colors.length] },
              ]}
            />
            <div>{asset.symbol}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationPieChart;
