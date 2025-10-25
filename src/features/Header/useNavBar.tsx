import { TabsNavProps } from '@lobehub/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSelectorHide } from '@/hooks/useSelectorHide';

import { genNavList, getNavButtons } from './genNavList';

export const useNavBar = (mobile?: boolean) => {
  const [items, setItems] = useState<TabsNavProps['items']>([]);
  const navList = useMemo(() => genNavList(), []);
  const onChange: TabsNavProps['onChange'] = useCallback(
    (id: string) => {
      console.debug('🤯 [nav] onClick', id);
      const index = navList.find((nav) => nav.id === id)?.index || 0;
      const buttonList = getNavButtons();
      buttonList[index].click();
    },
    [navList],
  );
  useSelectorHide('#tabs > .tab-nav:first-of-type');
  useEffect(() => {
    try {
      const list: TabsNavProps['items'] = navList.map((item) => {
        return {
          key: item.id,
          label: mobile ? <div onClick={() => onChange(item.id)}>{item.label}</div> : item.label,
        };
      });
      setItems(list.filter(Boolean));
      console.log('🤯 [layout] inject - Header');
    } catch (error) {
      console.error('🤯 [layout] inject - Header', error);
    }
  }, [mobile]);
  return {
    items,
    onChange,
  };
};
