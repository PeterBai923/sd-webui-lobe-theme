import type { StateCreator } from 'zustand/vanilla';

import { getLocaleOptions, getSetting, postSetting } from './api';
import { DEFAULT_SETTING, type WebuiSetting } from './initialState';
import type { Store } from './store';

export const SETTING_KEY = 'SD-LOBE-SETTING';
export const FALLBACK_SETTING_KEY = 'SD-KITCHEN-SETTING';
export interface StoreAction {
  onInit: () => void;
  onLoadLocalOptions: () => void;
  onLoadSetting: () => void;
  onSetSetting: (setting: Partial<WebuiSetting>) => void;
  onSetThemeMode: (themeMode: 'light' | 'dark') => void;
  setCurrentTab: () => void;
}

export const createSettings: StateCreator<Store, [['zustand/devtools', never]], [], StoreAction> = (
  set,
  get,
) => ({
  onInit: async() => {
    set(() => ({ loading: true }), false, 'onInit');
    const { onLoadSetting, onLoadLocalOptions } = get();
    await onLoadLocalOptions();
    await onLoadSetting();
    set(() => ({ loading: false }), false, 'onInit');
  },
  onLoadLocalOptions: async() => {
    const localeOptions = await getLocaleOptions();
    set(() => ({ localeOptions }), false, 'onLoadLocalOptions');
  },
  onLoadSetting: async() => {
    let themeSetting;
    const webuiSetting: any = await getSetting();

    if (webuiSetting) {
      console.log('🤯 [setting] loaded webui setting');
      themeSetting = webuiSetting;
    }

    if (!themeSetting) {
      const localSetting: any = localStorage.getItem(SETTING_KEY);
      if (localSetting) {
        console.info('🤯 [setting] loaded local setting');
        themeSetting = JSON.parse(localSetting);
      }
    }

    if (!themeSetting) {
      const fallbackLocalSetting: any = localStorage.getItem(FALLBACK_SETTING_KEY);
      if (fallbackLocalSetting) {
        console.info('🤯 [setting] loaded fallback local setting');
        themeSetting = JSON.parse(fallbackLocalSetting);
      }
    }

    if (!themeSetting) {
      console.info('🤯 [setting] loaded default setting');
      themeSetting = DEFAULT_SETTING;
    }

    const setting = { ...DEFAULT_SETTING, ...themeSetting };

    await postSetting(setting);
    set(() => ({ setting }), false, 'onLoadSetting');
    console.log('🤯 [setting] loaded');
    console.table(setting);
  },
  onSetSetting: async(setting) => {
    const oldSetting = get().setting;
    const newSetting = { ...oldSetting, ...setting };
    localStorage.setItem(SETTING_KEY, JSON.stringify(newSetting));
    await postSetting(newSetting);
    set(() => ({ setting: newSetting }), false, 'onSetSetting');
  },
  onSetThemeMode: (themeMode) => {
    set(() => ({ themeMode }), false, 'onSetThemeMode');
  },
  setCurrentTab: () => {
    const currentTab = get_uiCurrentTabContent()?.id;
    console.info('🤯 [tab] onChange', currentTab);
    if (currentTab && currentTab !== get().currentTab) {
      set({ currentTab }, false, 'setCurrentTab');
    }
  },
});
