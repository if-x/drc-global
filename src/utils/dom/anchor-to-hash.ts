import { scroller } from "react-scroll";
import { routingHistory } from "./history";

export const anchorToElement = (elementId: string) => {
  scroller.scrollTo(elementId, {
    smooth: true,
    offset: -30,
  });
};

export const anchorToHash = () => {
  const history = routingHistory();
  if (history) {
    const hash = history.location.hash;

    if (hash.startsWith("#")) {
      const element = hash.slice(1);
      anchorToElement(element);
    }
  }
};
