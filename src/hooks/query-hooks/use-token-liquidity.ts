import * as React from "react";
import { getTokenLiquidity } from "../../utils/uniswap-graph/token-liquidity";

export const useTokenLiquidity = (address: string) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<number | null>();

  React.useEffect(() => {
    setLoading(true);
    getTokenLiquidity(address)
      .then((liq) => {
        setData(liq);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setData(null);
      });
  }, [address]);

  return {
    data,
    loading,
  };
};
