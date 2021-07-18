import * as queryString from "query-string";
import { Language } from "../../types/language";
import { routingHistory } from "./dom/history";

interface UrlByLangInput {
  url: string;
  lang?: Language;
}

export const getUrlByLanguage = ({ url, lang = "en" }: UrlByLangInput) => {
  if (lang === "en") {
    return url;
  }
  return `/${lang}${url}`;
};

export const getUrlParams = () => {
  const history = routingHistory();
  if (history) {
    const search = history.location.search;
    const parsed = queryString.parse(search);

    return parsed;
  }

  return {};
};

export function getUrlParamStringByName(name: string, url?: string) {
  if (typeof window !== undefined) {
    const actualUrl = url || window.location.href;

    if (!actualUrl || actualUrl.indexOf("?") === -1) {
      return undefined;
    }

    const params = actualUrl.split("?")[1].split(/(&|#)/);
    let paramValue: string | undefined;

    params.forEach((param) => {
      const keyValue = param.split("=");
      if (keyValue[0].toLowerCase() === name.toLowerCase()) {
        paramValue = decodeURIComponent(keyValue[1]);
      }
    });

    return paramValue;
  }

  return undefined;
}

export function addUrlParameterToLocation(name: string, value: string): void {
  const existingValue = getUrlParamStringByName(name);
  const paramToAdd = `${name}=${encodeURIComponent(value)}`;
  const history = routingHistory();

  if (history) {
    const currentPath = history.location.pathname;
    const currentParams = history.location.search;

    let newParams = currentPath;

    if (existingValue) {
      newParams = currentParams.replace(
        `${name}=${encodeURIComponent(existingValue)}`,
        paramToAdd
      );
    } else {
      if (currentParams === "") {
        newParams = `?${paramToAdd}`;
      } else {
        newParams = `${currentParams}&${paramToAdd}`;
      }
    }

    history.replace(`${currentPath}${newParams}`);
  }
}

export function removeUrlParameterFromLocation(name: string): void {
  const params = getUrlParams();
  const history = routingHistory();

  if (history) {
    delete params[name];
    const currentPath = history.location.pathname;
    const newQueryString = queryString.stringify(params);
    const newParams = newQueryString === "" ? "" : `?${newQueryString}`;

    history.replace(`${currentPath}${newParams}`);
  }
}
