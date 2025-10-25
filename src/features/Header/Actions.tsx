/*
 * @Author: Peter_Bai
 * @Date: 2024-12-14 12:32:28
 * @KKDY保佑代码无BUG!:
 */
import { ActionIcon } from '@lobehub/ui';
import { Space } from 'antd';
import { LayoutGrid, LucideIcon, Moon, Settings, Sun } from 'lucide-react';
import qs from 'query-string';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Setting from '@/features/Setting';
import { selectors, useAppStore } from '@/store';

const CivitaiLogo: LucideIcon | any = ({ size }: any) => (
  <svg fill="currentColor" height={size} viewBox="0 0 16 16" width={size}>
    <path d="M2 4.5L8 1l6 3.5v7L8 15l-6-3.5v-7zm6-1.194L3.976 5.653v4.694L8 12.694l4.024-2.347V5.653L8 3.306zm0 1.589l2.662 1.552v.824H9.25L8 6.54l-1.25.73v1.458L8 9.46l1.25-.73h1.412v.824L8 11.105 5.338 9.553V6.447L8 4.895z" />
  </svg>
);

interface ActionsProps {
  themeMode: 'dark' | 'light';
}

const Actions = memo<ActionsProps>(() => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const themeMode = useAppStore(selectors.themeMode);
  const { t } = useTranslation();

  const handleSetTheme = useCallback(() => {
    const theme = themeMode === 'light' ? 'dark' : 'light';
    const gradioURL = qs.parseUrl(window.location.href);
    gradioURL.query.__theme = theme;
    window.location.replace(qs.stringifyUrl(gradioURL));
  }, [themeMode]);

  return (
    <>
      <Space.Compact>
        <a href="https://civitai.com/" rel="noreferrer" target="_blank">
          <ActionIcon icon={CivitaiLogo} title="Civitai" />
        </a>
        <a
          href="https://supagruen.github.io/StableDiffusion-CheatSheet/"
          rel="noreferrer"
          target="_blank"
        >
          <ActionIcon icon={LayoutGrid} title="Cheat Sheet" />
        </a>
        <ActionIcon
          icon={themeMode === 'light' ? Sun : Moon}
          onClick={handleSetTheme}
          title={t('header.switchTheme')}
        />
        <ActionIcon
          icon={Settings}
          onClick={() => setIsSettingOpen(true)}
          title={t('header.setting')}
        />
      </Space.Compact>
      <Setting onCancel={() => setIsSettingOpen(false)} open={isSettingOpen} />
    </>
  );
});

export default Actions;
