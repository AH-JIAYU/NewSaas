import { defaultsDeep } from "lodash-es";
import type { RecursiveRequired, Settings } from "#/global";
import settingsDefault from "@/settings.default";

const globalSettings: Settings.all = {
  breadcrumb: {
    style: "modern",
  },
  menu: {
    isRounded: true,
    menuMode: "head",
    switchMainMenuAndPageJump: true,
  },
  tabbar: {
    enable: true,
    style: "fashion",
  },
  toolbar: {
    favorites: true,
    i18n: true,
    notification: true,
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
};

export default defaultsDeep(
  globalSettings,
  settingsDefault
) as RecursiveRequired<Settings.all>;
