import * as React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipFormatter,
  XAxis,
  YAxis,
} from "recharts";
import formatDate from "dateformat";
import { useTheme } from "emotion-theming";
import { TokenValueTimeStep } from "../../../../../utils/web3/dr-vault/vault-performance-timeline";
import { Theme } from "../../../../../../types/theme";
import {
  formatCurrency,
  formatNumber,
} from "../../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../../types/currency";
import { TooltipContainerStyles } from "../../../../ui-library/design-tokens/charts";

const timeFormat = (startTime: number, endTime: number) => {
  const days = (endTime - startTime) / (1000 * 60 * 60 * 24);
  if (days < 2) {
    return "H:MM";
  }
  if (days < 366) {
    return "dd mmm";
  }
  if (days < 731) {
    return "yyyy mmm";
  }
  return "yyyy";
};

interface PerformanceLineChartProps {
  dataKey: "price" | "tvl";
  data: TokenValueTimeStep[];
}

const PerformanceLineChart: React.FC<PerformanceLineChartProps> = ({
  dataKey,
  data,
}) => {
  const theme = useTheme<Theme>();

  const startTime = data[0].date;
  const endTime = data[data.length - 1].date;
  const maxPrice = Math.max(...data.map((d) => d[dataKey]));
  const minPrice = Math.min(...data.map((d) => d[dataKey]));
  const priceDistance = maxPrice - minPrice;

  const timeFormatter = (date: number) =>
    formatDate(new Date(date), timeFormat(startTime, endTime));

  const priceFormatter = (value: number) =>
    formatCurrency({ value, currency: CurrencySymbol.USD });

  const toolTipFormatter: TooltipFormatter = (value, name) => {
    if (name === "Performance since genesis" && typeof value === "number") {
      return [`${formatNumber({ value: value * 100, round: 1 })}%`, name];
    }
    return [priceFormatter(value as number), name];
  };

  const keyName = dataKey === "price" ? "DR-POD NAV" : "TVL";

  return (
    <div css={{ fontSize: 12 }}>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            type="number"
            scale="time"
            domain={["dataMin", "dataMax"]}
            tickFormatter={timeFormatter}
            tickLine={false}
            tickMargin={5}
            tick={{ fill: theme.foreground }}
            axisLine={{ stroke: theme.border }}
            minTickGap={40}
          />

          <YAxis
            yAxisId="left"
            dataKey={dataKey}
            orientation="left"
            domain={[
              (dataMin) => dataMin - priceDistance / 10,
              (dataMax) => dataMax + priceDistance / 10,
            ]}
            tickFormatter={priceFormatter}
            hide={true}
          />

          <Tooltip
            cursor={false}
            contentStyle={TooltipContainerStyles(theme)}
            labelFormatter={(date) =>
              formatDate(new Date(date), "yyyy mmm dd H:MM")
            }
            formatter={toolTipFormatter}
            itemStyle={{ paddingBottom: 0 }}
          />
          <Line
            yAxisId="left"
            dataKey={dataKey}
            type="monotone"
            name={keyName}
            dot={false}
            strokeWidth={3}
            stroke={theme.foreground}
          />

          <YAxis
            yAxisId="right"
            dataKey="percentage"
            orientation="right"
            hide={true}
          />
          <Line
            yAxisId="right"
            dataKey="percentage"
            type="monotone"
            name="Performance since genesis"
            dot={false}
            activeDot={false}
            strokeWidth={0}
            stroke={theme.foreground}
            hide={dataKey === "tvl"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceLineChart;
