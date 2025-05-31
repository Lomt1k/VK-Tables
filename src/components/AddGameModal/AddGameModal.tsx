import './AddGameModal.scss';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gameFormSchema, type GameFormValues } from '@/types';
import { Modal, DynamicFormFields, Button } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import type { FormField } from '@/types';
import { gameStore } from '@/stores';
import { fetchAddGame } from '@/api/gameApi';

type AddGameModalProps = {
  onClose: () => void;
  formFields: FormField<GameFormValues>[];
};

export const AddGameModal: FC<AddGameModalProps> = observer(({ onClose, formFields }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
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
    onError: () => {
      reset();
    }
  });

  const onSubmit = (data: GameFormValues) => {
    createGameMutation.mutate(data);
  };

  return (
    <Modal onClickClose={onClose}>
      <div className="add-game-modal">
        <h3 className='add-game-modal__heading'>Добавить игру</h3>
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