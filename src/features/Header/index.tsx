import { Header as H } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { memo } from 'react';

import { Logo } from '@/components';
import { OFFICIAL_SITE } from '@/const/url';
import { useAppStore } from '@/store';
import { type DivProps } from '@/types';

import Actions from './Actions';
import Nav from './Nav';

const Header = memo<DivProps>(({ children }) => {
  const { themeMode } = useAppStore((st) => ({
    themeMode: st.themeMode,
  }));
  const theme = useTheme();

  return (
    <H
      actions={<Actions themeMode={themeMode} />}
      actionsStyle={{ flex: 0 }}
      logo={
        <div
          onClick={() => window.open(OFFICIAL_SITE, '_blank')}
          style={{
            alignItems: 'center',
            color: theme.colorText,
            cursor: 'pointer',
            display: 'flex',
            textDecoration: 'none',
          }}
        >
          <Logo />
        </div>
      }
      nav={
        <>
          <Nav />
          {children}
        </>
      }
    />
  );
});

export default Header;
