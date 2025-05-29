import type { Game } from "@/types";
import { type FC, memo } from "react";

type GamesTableRowProps = {
  game: Game
}

export const GameTableRow: FC<GamesTableRowProps> = memo(({ game }) => {
  return (
    <tr className="games-table__row games-table__row--data">
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
  )
});