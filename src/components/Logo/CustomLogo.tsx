import { Logo as LobeLogo } from '@lobehub/ui';
import { Space } from 'antd';
import { type CSSProperties, memo } from 'react';

export interface CustomLogoProps {
  logoCustomTitle?: string;
  logoCustomUrl?: string;
  size?: number;
  style?: CSSProperties;
}

const CustomLogo = memo<CustomLogoProps>(({ size = 32, style, logoCustomUrl, logoCustomTitle }) => {
  let customLogo = <LobeLogo size={size} style={style} />;

  if (logoCustomUrl) {
    if (logoCustomUrl.includes('http') || logoCustomUrl.includes('data')) {
      customLogo = <img alt="logo" src={logoCustomUrl} style={{ height: size, ...style }} />;
    } else {
      // 移除表情符号检测和渲染逻辑
      customLogo = <span style={{ fontSize: size, ...style }}>{logoCustomUrl}</span>;
    }
  }

  return (
    <Space align="center" size={size * 0.3}>
      {customLogo}
      <b style={{ fontSize: size * 0.6, whiteSpace: 'nowrap' }}>{logoCustomTitle}</b>
    </Space>
  );
});

export default CustomLogo;
