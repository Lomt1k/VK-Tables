import type { Game } from "@/types";
import { AddGameModal, Button } from "@/components";
import { type FC, memo, useState } from "react";
import { allGameFields, getLocalizedStatus } from "@/utils";

type GamesTableRowProps = {
  game: Game
}

export const GameTableRow: FC<GamesTableRowProps> = memo(({ game }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <tr className="games-table__row games-table__row--data">
      <td className="games-table__cell">{getLocalizedStatus(game.status)}</td>
      <td className="games-table__cell">{game.title}</td>
      <td className="games-table__cell">{game.genre}</td>
      <td className="games-table__cell">{game.year}</td>
      <td className="games-table__cell">
        {game.multiplayer === undefined ? '' : game.multiplayer ? 'Есть' : 'Нет'}
      </td>
      <td className="games-table__cell">{game.platform}</td>
      <td className="games-table__cell">{game.developer}</td>
      <td className="games-table__cell">{game.publisher}</td>
      <td className="games-table__cell">
        <Button small
          className="games-table__edit-btn"
          onClick={() => setShowModal(true)}
        >
          ✏️
        </Button>
        {showModal &&
          <AddGameModal
            formFields={allGameFields}
            onClose={() => setShowModal(false)}
            editGame={game}
          />
        }
      </td>
    </tr>
  )
});