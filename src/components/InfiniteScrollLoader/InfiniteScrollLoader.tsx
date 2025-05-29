import { useEffect, type FC } from 'react';

type InfiniteScrollLoaderProps = {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
};

export const InfiniteScrollLoader: FC<InfiniteScrollLoaderProps> = ({
  onLoadMore,
  hasMore,
  isLoading,
}) => {
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const checkInitialLoad = () => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollHeight <= window.innerHeight) {
        onLoadMore();
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const isAtBottom = scrollTop + window.innerHeight >= scrollHeight * 0.8;

      if (isAtBottom) {
        onLoadMore();
      }
    };

    checkInitialLoad();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkInitialLoad);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkInitialLoad);
    };
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <>
      {isLoading && <div>Загрузка...</div>}
    </>
  );
};