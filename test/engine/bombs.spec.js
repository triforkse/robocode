import actions from '../../src/engine/actions.js';
import boards from '../../src/engine/boards.js';
import AI from '../../src/engine/ai.js';
import Dirs from '../../src/engine/directions.js';
import engine from '../../src/engine/engine.js';
import {x0y0, x0y1, x1y0, x1y1} from './helpers.js'

describe('Bombs', () => {
  let game;

  const bomb = {
    type: 'bomb',
    id: 777
  };

  beforeEach(() => {
    game = engine.createGame(2, 1);
    game = game.update('board', board => board.place(bomb,1,1));
  });

  describe('when placing a bomb', () => {
    it('it is on the board', () => {
      expect(game.board.valueAt(1,1)).toBe(bomb);
    });
  });

  describe('when a robot steps on bomb', () => {
    it('loses health', () => {
      game = game.setIn(["robots", 0, "ai"], "function(me, others){return AI.moveSouthEast();}")
      const robot = game.robots.get(0);
      const newGameState = engine.robotTurn(game, robot);
      expect(newGameState.board.valueAt(1,1)).toBe(robot.id);
      expect(newGameState.robots.get(robot.id).health).toBe(90);
    });
  });
});
