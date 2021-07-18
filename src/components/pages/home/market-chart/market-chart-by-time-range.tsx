import * as React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import formatDate from "dateformat";
import { useTheme } from "emotion-theming";
import { MarketDays } from "../../../../../types/coin-market-data";
import { useCoinMarketData } from "../../../../hooks/query-hooks/use-coin-market-data";
import { TooltipContainerStyles } from "../../../ui-library/design-tokens/charts";
import { formatCurrency } from "../../../../utils/format-number";
import { CurrencySymbol } from "../../../../../types/currency";
import { COIN_ID } from "../../../../constants/coin-id";
import { Theme } from "../../../../../types/theme";
import Loader from "../../../ui-library/loader/loader";

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

interface MarketChartByTimeRangeProps {
  timeRange: MarketDays;
}

const MarketChartByTimeRange: React.FC<MarketChartByTimeRangeProps> = ({
  timeRange,
}) => {
  const { data, loading } = useCoinMarketData({
    id: COIN_ID,
    days: timeRange,
  });

  const theme = useTheme<Theme>();

  if (loading && !data) {
    return (
      <div css={{ height: 300 }}>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div css={{ height: 300 }}>No data</div>; // TODO: no data message
  }

  const startTime = data[0].date;
  const endTime = data[data.length - 1].date;
  const maxPrice = Math.max(...data.map((d) => d.price));
  const minPrice = Math.min(...data.map((d) => d.price));
  const priceDistance = maxPrice - minPrice;

  const timeFormatter = (date: number) =>
    formatDate(new Date(date), timeFormat(startTime, endTime));

  const priceFormatter = (value: number) =>
    formatCurrency({ value, currency: CurrencySymbol.USD });

  return (
    <div css={{ fontSize: 12 }}>
      <ResponsiveContainer width="100%" height={300}>
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
            minTickGap={50}
          />

          <YAxis
            yAxisId="left"
            dataKey="price"
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
            formatter={(value, name) => [priceFormatter(value as number), name]}
            itemStyle={{ paddingBottom: 0 }}
          />
          <Line
            yAxisId="left"
            dataKey="price"
            name="Price"
            dot={false}
            strokeWidth={3}
            stroke={theme.foreground}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChartByTimeRange;
