import { Button, AddGameModal } from "@/components";
import { allGameFields, minimalGameFields } from "@/utils";
import { useState, type FC } from "react";

type AddNewGameButtonProps = {
  shortForm?: boolean;
}

export const AddNewGameButton: FC<AddNewGameButtonProps> = ({ shortForm }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        {shortForm === true ? "Быстрое добавление" : "Добавить игру"}
      </Button>
      {showModal &&
        <AddGameModal
          onClose={() => setShowModal(false)}
          formFields={shortForm ? minimalGameFields : allGameFields}
        />
      }
    </>
  )
}