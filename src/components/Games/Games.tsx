import './Games.scss';
import { useGames } from '@/hooks';
import { Container } from '@/components';
import { GamesTable } from '.';

export const Games = () => {
  const { data: games, isLoading, isError } = useGames();

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <section className="games">
      <Container>
        <h2 className="games__heading">Список игр</h2>
        {games && <GamesTable games={games} />}
      </Container>
    </section>
  );
};