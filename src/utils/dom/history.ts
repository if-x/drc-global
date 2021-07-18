import { createBrowserHistory } from "history";

export const routingHistory = () =>
  typeof window !== "undefined" && createBrowserHistory();
