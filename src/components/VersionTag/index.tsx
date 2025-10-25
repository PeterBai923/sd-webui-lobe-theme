/*
 * @Author: Peter_Bai
 * @Date: 2024-12-14 12:32:28
 * @KKDY保佑代码无BUG!:
 */
import { Tag, TagProps } from 'antd';
import { memo } from 'react';

import { GITHUB_REPO_URL } from '@/const/url';

const VersionTag = memo<TagProps>((props) => {
  return (
    <a href={GITHUB_REPO_URL} rel="noreferrer" target="_blank">
      <Tag color="success" {...props}>
        LobeTheme
      </Tag>
    </a>
  );
});

export default VersionTag;
