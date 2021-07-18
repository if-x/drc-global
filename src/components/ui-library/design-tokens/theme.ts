import { darken } from "polished";
import { Theme } from "../../../../types/theme";
import { Colors } from "./colors";

export const lightTheme: Theme = {
  foreground: Colors.Black,
  text: Colors.Charcoal,
  background: Colors.White,
  secondaryBackground: Colors.LightGrey,
  border: Colors.BorderGrey,
  headerFooterBackground: Colors.Black,
  tooltipBackground: Colors.White,
  imageLoadingBackground: darken(0.05, Colors.White),
};

export const darkTheme: Theme = {
  foreground: Colors.DarkModeWhite,
  text: Colors.DarkModeOffWhite,
  background: Colors.DarkModeBlack,
  secondaryBackground: Colors.DarkModeOffBlack,
  border: Colors.DarkModeBorderGrey,
  headerFooterBackground: Colors.DarkModeOffBlack,
  tooltipBackground: Colors.DarkModeOffBlack,
  imageLoadingBackground: Colors.DarkModeOffBlack,
};
