import { PropsWithChildren, memo } from 'react';

const SyntaxHighlighter = memo<PropsWithChildren>(({ children }) => {
  return (
    <div
      style={{
        color: '#71c179',
        fontSize: '13px',
        padding: '15px',
      }}
    >
      {children}
    </div>
  );
});

export default SyntaxHighlighter;
