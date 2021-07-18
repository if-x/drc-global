import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { SiteContext } from "../../../../site-context/site-context";
import { Colors } from "../../design-tokens/colors";
import styles from "./allocation-pie-chart.styles";

const colorArrayLightMode = [Colors.Black, Colors.BorderGrey];
const colorArrayDarkMode = [Colors.White, Colors.DarkModeBorderGrey];

interface PercentagePieChartProps {
  percentage: number;
}

const PercentagePieChart: React.FC<PercentagePieChartProps> = ({
  percentage,
}) => {
  const data = [
    { name: "Your DRC", percentage: percentage },
    { name: "Other holders", percentage: 100 - percentage },
  ];
  const { isDarkMode } = React.useContext(SiteContext);
  const colors = isDarkMode ? colorArrayDarkMode : colorArrayLightMode;

  return (
    <div>
      <div css={styles.percentageChartContainer}>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              outerRadius={75}
              innerRadius={45}
              startAngle={90}
              endAngle={450}
              data={data}
              dataKey="percentage"
              nameKey="name"
              labelLine={false}
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div css={styles.percentage}>{percentage}%</div>
      </div>

      <div css={styles.legendContainer}>
        <div css={[styles.legendItem, styles.largeLegendItem]}>
          <div css={[styles.indicator, { backgroundColor: colors[0] }]} />
          <div>Your DRC</div>
        </div>
      </div>
    </div>
  );
};

export default PercentagePieChart;
