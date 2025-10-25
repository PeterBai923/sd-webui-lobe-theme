/*
 * @Author: Peter_Bai
 * @Date: 2024-12-14 12:32:28
 * @KKDY保佑代码无BUG!:
 */
import { Tag, TagProps } from 'antd';
import { memo } from 'react';

import { GITHUB_REPO_URL } from '@/const/url';
import { useAppStore } from '@/store';

const VersionTag = memo<TagProps>((props) => {
  const { version } = useAppStore((st) => ({
    version: st.version,
  }));

  return (
    <a href={GITHUB_REPO_URL} rel="noreferrer" target="_blank">
      <Tag color="success" {...props}>
        v{version}
      </Tag>
    </a>
  );
});

export default VersionTag;
