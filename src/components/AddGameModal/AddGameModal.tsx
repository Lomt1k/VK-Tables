import './AddGameModal.scss';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gameFormSchema, type GameFormValues } from '@/types';
import { Modal, DynamicFormFields, Button } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import type { FormField, Game } from '@/types';
import { gameStore } from '@/stores';
import { fetchAddGame, fetchEditGame } from '@/api';

type AddGameModalProps = {
  onClose: () => void,
  formFields: FormField<GameFormValues>[],
  editGame?: Game, // если указано - то это окно редактирования существующей игры
};

export const AddGameModal: FC<AddGameModalProps> = observer(({ onClose, formFields, editGame }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: editGame ?? {
      title: '',
      status: 'New'
    },
  });

  const createGameMutation = useMutation({
    mutationFn: fetchAddGame,
    onSuccess: (savedGame) => {
      gameStore.addGame(savedGame);
      onClose();
    },
    onError: alert
  });

  const editGameMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: GameFormValues }) => fetchEditGame(id, data),
    onSuccess: (updatedGame) => {
      gameStore.updateGame(updatedGame.id, updatedGame);
      onClose();
    },
    onError: alert
  });

  const onSubmit = (data: GameFormValues) => {
    if (editGame) {
      const id = editGame.id;
      editGameMutation.mutate({ id, data });
    } else {
      createGameMutation.mutate(data);
    }
  };

  return (
    <Modal onClickClose={onClose}>
      <div className="add-game-modal">
        <h3 className='add-game-modal__heading'>
          {editGame ? 'Редактировать игру' : 'Добавить игру'}
        </h3>
        <form className="add-game-modal__form" onSubmit={handleSubmit(onSubmit)}>
          <DynamicFormFields fields={formFields} register={register} errors={errors} />

          <div className="add-game-modal__actions">
            <Button submit disabled={createGameMutation.isPending}>
              {createGameMutation.isPending ? 'Сохраняю...' : 'Сохранить'}
            </Button>
            <Button onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
});