import {
	jest,
	expect,
	it,
} from '@jest/globals';

import { Role } from '@asmodee/werewolf-model';
import { Board } from '@asmodee/werewolf-core/game/Board.js';
import { Player } from '@asmodee/werewolf-core/game/Player.js';

const board = new Board();
const players = [
	new Player(1, Role.Werewolf),
	new Player(2, Role.Villager),
];

it('does not expose direct access to players', () => {
	board.setPlayers(players);
	expect(board.getPlayers()).not.toBe(players);
});

it('filters a live players', () => {
	jest.spyOn(players[0], 'isAlive').mockReturnValue(false);
	const alive = board.getAlivePlayers();
	expect(alive).toHaveLength(1);
	expect(alive).toContain(players[1]);
});

it('starts from Day 1', async () => {
	expect(board.isStarted()).toBe(false);
	await board.start();
	expect(board.isStarted()).toBe(true);
	expect(board.getDay()).toBe(1);
});
