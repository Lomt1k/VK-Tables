import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  const onClickMock = vi.fn();

  it('Рендерит переданный текст', () => {
    render(<Button>Кнопка</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Имеет базовый класс "button"', () => {
    render(<Button>Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('button');
  });

  it('Имеет класс "button--small" при пропсе small', () => {
    render(<Button small>Маленькая кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--small');
  });

  it('Принимает кастомный className', () => {
    render(<Button className="custom-class">Кастомная кнопка</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('Имеет type="submit" при пропсе submit={true}', () => {
    render(<Button submit>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('Отрабатывает onClick при клике', () => {
    render(<Button onClick={onClickMock}>Кликай меня полностью</Button>)
    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});