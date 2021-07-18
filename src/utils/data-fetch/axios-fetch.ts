import axios from "axios";
import LRU from "lru-cache";

interface SiteAxiosRes<T> {
  data?: T;
  error?: any;
  timestamp?: number;
}

const cache = new LRU<string, SiteAxiosRes<any>>({
  max: 50000,
  maxAge: 1000 * 60 * 5 - 100,
});

export const axiosFetch = async <T = any>(
  url: string
): Promise<SiteAxiosRes<T>> => {
  try {
    const cachedData: SiteAxiosRes<T> | undefined = cache.get(url);

    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get<T>(url, {
      timeout: 6000,
    });

    const finishTime = new Date().getTime();

    cache.set(url, {
      data: response.data,
      timestamp: finishTime,
    });

    return { data: response.data, timestamp: finishTime };
  } catch (error) {
    return { error };
  }
};
