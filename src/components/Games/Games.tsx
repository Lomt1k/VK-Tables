import './Games.scss';
import { useInfiniteGames } from '@/hooks';
import { Container, GamesTable, InfiniteScrollLoader } from '@/components';

export const Games = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteGames();

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <section className="games">
      <Container>
        <h2 className="games__heading">Список игр</h2>
        <GamesTable />
        <InfiniteScrollLoader
          onLoadMore={handleLoadMore}
          hasMore={!!hasNextPage}
          isLoading={isFetchingNextPage}
        />
      </Container>
    </section>
  );
};