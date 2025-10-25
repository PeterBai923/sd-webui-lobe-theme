import useSWR from 'swr';

export const useHighlight = (text: string, isDarkMode: boolean) =>
  useSWR([isDarkMode ? 'dark' : 'light', text].join('-'), async() => {
    return text;
  });
