import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '.';

vi.mock('react-dom', () => ({
  createPortal: (element: React.ReactNode) => element,
}));

describe('Modal Component', () => {
  const onClickCloseMock = vi.fn();

  it('Рендерит children внутри модального окна', () => {
    render(
      <Modal onClickClose={onClickCloseMock}>
        <span>Содержимое модалки</span>
      </Modal>
    );
    expect(screen.getByText("Содержимое модалки")).toBeInTheDocument();
  });

  it('Отображает кнопку закрытия', () => {
    render(
      <Modal onClickClose={onClickCloseMock}>
        <span>Тест модала</span>
      </Modal>
    );
    const closeBtn = screen.getByTestId('modal-close');
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveClass('modal__close');
  });

  it('Вызывает onClickClose при клике на кнопку закрытия', () => {
    render(
      <Modal onClickClose={onClickCloseMock}>
        <span>Тест модала</span>
      </Modal>
    );
    const closeBtn = screen.getByTestId('modal-close');
    fireEvent.click(closeBtn);
    expect(onClickCloseMock).toHaveBeenCalledTimes(1);
  });

  it('Вызывает onClickClose при клике вне контентной области', () => {
    render(<Modal onClickClose={onClickCloseMock}>Контент</Modal>);

    const modalDiv = screen.getByTestId('modal-close').parentElement?.parentElement;
    if (modalDiv) {
      fireEvent.mouseDown(modalDiv);
      fireEvent.click(modalDiv);
    }
    expect(onClickCloseMock).toHaveBeenCalledTimes(2);
  });

  it('Не вызывает onClickClose при клике внутри контентной области', () => {
    render(
      <Modal onClickClose={onClickCloseMock}>
        <div className="modal__content-inside">Контент</div>
      </Modal>
    );
    const contentDiv = screen.getByText("Контент").parentElement;
    if (contentDiv) {
      fireEvent.mouseDown(contentDiv);
      fireEvent.click(contentDiv);
    }
    expect(onClickCloseMock).toHaveBeenCalledTimes(2);
  });
});