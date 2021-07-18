import React from "react";
import SiteProvider from "./src/site-context/site-provider";

export const wrapRootElement = ({ element }) => {
  return <SiteProvider>{element}</SiteProvider>;
};
