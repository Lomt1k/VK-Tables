export const getLocalizedStatus = (status: 'New' | 'InProgress' | 'Done') => {
  switch (status) {
    case 'New': return 'Новая';
    case 'InProgress': return 'В процессе';
    case 'Done': return 'Завершена';
  }
}