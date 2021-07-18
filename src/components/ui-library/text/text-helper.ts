import { Interpolation, ObjectInterpolation } from "@emotion/core";
import { Device } from "../design-tokens/media-queries";

export const getLineHeightByFontSize = (fontSize: number) => {
  let lineHeightRatio = 1.5;
  if (fontSize > 16) {
    lineHeightRatio = 1.4;
  }
  if (fontSize > 18) {
    lineHeightRatio = 1.3;
  }
  if (fontSize > 20) {
    lineHeightRatio = 1.25;
  }
  if (fontSize > 28) {
    lineHeightRatio = 1.2;
  }
  if (fontSize > 34) {
    lineHeightRatio = 1.1;
  }
  if (fontSize > 40) {
    lineHeightRatio = 1.05;
  }

  const lineHeightValue = fontSize * lineHeightRatio;
  const lineHeight = Math.round(lineHeightValue / 2) * 2;

  return `${lineHeight}px`;
};

export const textSizeStyle = (
  textSize: number,
  lineHeight?: number
): Interpolation => {
  return {
    fontSize: `${textSize}px`,
    lineHeight: lineHeight
      ? `${lineHeight}px`
      : getLineHeightByFontSize(textSize),
  };
};

export interface DeviceTextSize {
  size?: number;
  desktop?: number;
  mobile?: number;
}

export const getResponsiveTextSize = (
  textSize: number | DeviceTextSize | undefined
): ObjectInterpolation<undefined> => {
  let textSizeValue: ObjectInterpolation<undefined> = {};

  if (textSize) {
    if (typeof textSize === "number") {
      textSizeValue.fontSize = `${textSize}px`;
      textSizeValue.lineHeight = getLineHeightByFontSize(textSize);
    } else if (typeof textSize === "object") {
      const { size, desktop, mobile } = textSize as DeviceTextSize;

      const textSizeDefault = getResponsiveTextSize(size);
      const textSizeDesktop = desktop && getResponsiveTextSize(desktop);
      const textSizeMobile = mobile && getResponsiveTextSize(mobile);

      textSizeValue = {
        ...textSizeDefault,

        [Device.Mobile]: textSizeMobile,
        [Device.DesktopTablet]: textSizeDesktop,
      };
    }
  }

  return textSizeValue;
};

export type TextAlignType = "center" | "left" | "right";

export interface DeviceTextAlign {
  desktop?: TextAlignType;
  mobile?: TextAlignType;
}

export const getResponsiveTextAlign = (
  textAlign: TextAlignType | DeviceTextAlign | undefined
): Interpolation => {
  let textAlignValue: Interpolation = {};

  if (textAlign) {
    if (typeof textAlign === "string") {
      textAlignValue.textAlign = textAlign;
    } else if (typeof textAlign === "object") {
      const { desktop, mobile } = textAlign as DeviceTextAlign;

      textAlignValue = {
        [Device.Mobile]: { textAlign: mobile },
        [Device.DesktopTablet]: { textAlign: desktop },
      };
    }
  }

  return textAlignValue;
};
