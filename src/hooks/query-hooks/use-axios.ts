import * as React from "react";
import { axiosFetch } from "../../utils/data-fetch/axios-fetch";

interface AxiosRes<T> {
  loading: boolean;
  data?: T;
  error?: any;
  timestamp?: number;
}

interface UseAxiosRes<T> extends AxiosRes<T> {
  refetch: () => Promise<void>;
}

interface UseAxiosOptions {
  refetchInterval?: number;
}

export const useAxios = <T = any>(
  url: string,
  options?: UseAxiosOptions
): UseAxiosRes<T> => {
  const [state, setState] = React.useState<AxiosRes<T>>({
    loading: false,
  });

  const fetchData = React.useCallback(async () => {
    setState({
      ...state,
      loading: true,
    });

    const res = await axiosFetch(url);

    setState({
      ...res,
      loading: false,
    });
  }, [url]);

  React.useEffect(() => {
    let refetchTimer: NodeJS.Timeout;
    fetchData();

    if (options?.refetchInterval) {
      refetchTimer = setInterval(() => fetchData(), options.refetchInterval);
    }

    return () => {
      clearInterval(refetchTimer);
    };
  }, [url]);

  return {
    ...state,
    refetch: fetchData,
  };
};
