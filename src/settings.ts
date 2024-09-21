import { defaultsDeep } from "lodash-es";
import type { RecursiveRequired, Settings } from "#/global";
import settingsDefault from "@/settings.default";
// @ts-ignore
const globalConfiguration: any = JSON.parse(localStorage.getItem('saas_globalConfiguration'))
const globalSettings: Settings.all = globalConfiguration || {
  "breadcrumb": {
    "style": "modern"
  },
  "menu": {
    "isRounded": true,
    "menuMode": "head",
    "switchMainMenuAndPageJump": true
  },
  "tabbar": {
    "style": "fashion"
  },
  "toolbar": {
    "favorites": true,
    "i18n": true,
    "notification": true,
    "fullscreen": true,
    "pageReload": true,
    "colorScheme": true
  },
  "app": {
    "lightTheme": "lightBlue"
  },
  "topbar": {
    "mode": "fixed"
  }
}

export default defaultsDeep(
  globalSettings,
  settingsDefault
) as RecursiveRequired<Settings.all>;
