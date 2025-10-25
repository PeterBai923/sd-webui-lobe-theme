/*
 * @Author: Peter_Bai
 * @Date: 2025-10-25 16:30:04
 * @KKDY保佑代码无BUG!:
 */
import { Button, Popconfirm } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DEFAULT_SETTING, useAppStore } from '@/store';

const Footer = memo(() => {
  const { t } = useTranslation();
  const onSetSetting = useAppStore((st) => st.onSetSetting);

  const onReset = useCallback(() => {
    onSetSetting(DEFAULT_SETTING);
    location.reload();
  }, []);

  const buttonStyle = { margin: 0 };

  return (
    <Flexbox flex={1} gap={12} horizontal justify={'flex-end'}>
      <Popconfirm
        cancelText={t('cancel')}
        okText={t('confirm')}
        okType={'danger'}
        onConfirm={onReset}
        title={t('setting.button.reset')}
      >
        <Button danger style={buttonStyle}>
          {t('setting.button.reset')}
        </Button>
      </Popconfirm>
      <Button form="theme_settings" htmlType="submit" style={buttonStyle} type="primary">
        {t('setting.button.submit')}
      </Button>
    </Flexbox>
  );
});
export default Footer;
