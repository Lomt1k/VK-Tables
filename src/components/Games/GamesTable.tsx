import './GamesTable.scss';
import type { Game } from "@/types";
import type { FC } from "react";

type GamesTableProps = {
  games: Game[]
}

export const GamesTable: FC<GamesTableProps> = ({ games }) => {
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
        {games?.map((game) => (
          <tr key={game.id} className="games-table__row games-table__row--data">
            <td className="games-table__cell">{game.status}</td>
            <td className="games-table__cell">{game.title}</td>
            <td className="games-table__cell">{game.genre}</td>
            <td className="games-table__cell">{game.year}</td>
            <td className="games-table__cell">
              {game.multiplayer === undefined ? '' : game.multiplayer ? 'Есть' : 'Нет'}
            </td>
            <td className="games-table__cell">{game.platform}</td>
            <td className="games-table__cell">{game.developer}</td>
            <td className="games-table__cell">{game.publisher}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}