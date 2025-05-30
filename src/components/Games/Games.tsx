import './Games.scss';
import { useInfiniteGames } from '@/hooks';
import { Button, Container, GamesTable, InfiniteScrollLoader } from '@/components';

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

  return (
    <section className="games">
      <Container>
        <div className="games__top">
          <h2 className="games__heading">Список игр</h2>
          <Button>Добавить игру</Button>
        </div>
        {isLoading ? <div>Загрузка...</div>
          : isError ? <div>Ошибка загрузки данных</div>
            : (
              <>
                <GamesTable />
                <InfiniteScrollLoader
                  onLoadMore={handleLoadMore}
                  hasMore={!!hasNextPage}
                  isLoading={isFetchingNextPage}
                />
              </>
            )
        }
      </Container>
    </section>
  );
};