import type { Game } from '@/types';
import { makeAutoObservable } from 'mobx';

export class GameStore {
  games: Game[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setGames(games: Game[]) {
    this.games = games;
  }

  addGame(game: Game) {
    this.games.push(game);
  }

  addGames(newGames: Game[]) {
    this.games = [...this.games, ...newGames];
  }

  updateGame(id: string, updatedGame: Partial<Game>) {
    const index = this.games.findIndex((game) => game.id === id);
    if (index !== -1) {
      this.games[index] = { ...this.games[index], ...updatedGame };
    }
  }

  removeGame(id: string) {
    this.games = this.games.filter((game) => game.id !== id);
  }
}