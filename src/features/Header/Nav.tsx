/*
 * @Author: Peter_Bai
 * @Date: 2025-10-25 16:30:04
 * @KKDY保佑代码无BUG!:
 */
import { TabsNav } from '@lobehub/ui';
import { memo } from 'react';

import { selectors, useAppStore } from '@/store';

import { useNavBar } from './useNavBar';

const Nav = memo(() => {
  const currentTab = useAppStore(selectors.currentTab);
  const { items, onChange } = useNavBar();
  return <TabsNav activeKey={currentTab} items={items} onChange={onChange} />;
});

export default Nav;
