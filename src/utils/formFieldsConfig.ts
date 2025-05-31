import type { FormField, GameFormValues } from '@/types';

export const allGameFields: FormField<GameFormValues>[] = [
  {
    name: 'title',
    label: 'Название',
    type: 'text',
  },
  {
    name: 'year',
    label: 'Год выпуска',
    type: 'number',
  },
  {
    name: 'genre',
    label: 'Жанр',
    type: 'text',
  },
  {
    name: 'developer',
    label: 'Разработчик',
    type: 'text',
  },
  {
    name: 'publisher',
    label: 'Издатель',
    type: 'text',
  },
  {
    name: 'platform',
    label: 'Платформа',
    type: 'text',
  },
  {
    name: 'multiplayer',
    label: 'Мультиплеер',
    type: 'checkbox',
  },
  {
    name: 'status',
    label: 'Статус',
    type: 'select',
    options: [
      { value: 'New', label: 'Новая' },
      { value: 'InProgress', label: 'В процессе' },
      { value: 'Done', label: 'Завершена' },
    ],
  },
];

export const minimalGameFields: FormField<GameFormValues>[] = [
  {
    name: 'title',
    label: 'Название',
    type: 'text',
  },
  {
    name: 'status',
    label: 'Статус',
    type: 'select',
    options: [
      { value: 'New', label: 'Новая' },
      { value: 'InProgress', label: 'В процессе' },
      { value: 'Done', label: 'Завершена' },
    ],
  },
];