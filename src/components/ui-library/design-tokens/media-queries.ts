export enum Device {
  Desktop = "@media (min-width: 992px)",
  TabletMobile = "@media (max-width: 991px)",
  DesktopTablet = "@media (min-width: 768px)",
  Tablet = "@media (max-width: 991px) and (min-width: 768px)",
  Mobile = "@media (max-width: 767px)",
  MobileLand = "@media (max-width: 767px) and (min-width: 480px)",
  MobilePort = "@media (max-width: 479px)",
  MobilePortXs = "@media (max-width: 320px)",
}
