import './GamesTable.scss';
import { gameStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { GameTableRow } from './GamesTableRow';

export const GamesTable = observer(() => {
  const games = gameStore.games;

  return (
    <table className="games-table">
      <thead className="games-table__header">
        <tr className="games-table__row games-table__row--header">
          <th className="games-table__cell games-table__cell--header">Статус</th>
          <th className="games-table__cell games-table__cell--header">Название</th>
          <th className="games-table__cell games-table__cell--header">Жанр</th>
          <th className="games-table__cell games-table__cell--header">Год</th>
          <th className="games-table__cell games-table__cell--header">Мультиплеер</th>
          <th className="games-table__cell games-table__cell--header">Платформа</th>
          <th className="games-table__cell games-table__cell--header">Разработчик</th>
          <th className="games-table__cell games-table__cell--header">Издатель</th>
        </tr>
      </thead>
      <tbody className="games-table__body">
        {games.map((game) => (
          <GameTableRow key={game.id} game={game} />
        ))}
      </tbody>
    </table>
  );
});