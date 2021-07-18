import { margin as polishedMargin } from "polished";
import { Interpolation } from "@emotion/core";
import { Device } from "./media-queries";

export type MarginValue = null | void | string | null | void | number;
export type MarginArray = [MarginValue, MarginValue, MarginValue, MarginValue];

export interface MarginObj {
  top?: MarginValue;
  bottom?: MarginValue;
  left?: MarginValue;
  right?: MarginValue;
}

export interface DeviceMargin extends MarginObj {
  desktop?: MarginArray | MarginObj;
  mobile?: MarginArray | MarginObj;
}

export const getMarginValue = (
  margin: DeviceMargin | MarginArray | MarginObj | undefined
): Interpolation => {
  let marginValue: Interpolation = { margin: 0 };

  if (margin) {
    if (Array.isArray(margin)) {
      marginValue = polishedMargin(...margin);
    } else if (typeof margin === "object") {
      const { top = 0, right = 0, bottom = 0, left = 0 } = margin;
      marginValue = polishedMargin(top, right, bottom, left);

      const { desktop, mobile } = margin as DeviceMargin;

      if (desktop || mobile) {
        const marginDesktop = desktop && getMarginValue(desktop);
        const marginMobile = mobile && getMarginValue(mobile);

        marginValue = {
          ...marginValue,

          [Device.Mobile]: marginMobile,
          [Device.DesktopTablet]: marginDesktop,
        };
      }
    }
  }

  return marginValue;
};
