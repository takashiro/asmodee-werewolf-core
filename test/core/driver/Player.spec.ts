import {
	jest,
	expect,
	it,
} from '@jest/globals';
import {
	Role,
	Team,
} from '@asmodee/werewolf-model';

import { Player } from '@asmodee/werewolf-core/game/Player.js';

const player = new Player(8, Role.AlphaWolf);

it('has a role of alpha wolf', () => {
	expect(player.getRole()).toBe(Role.AlphaWolf);
});

it('is on team werewolf', () => {
	expect(player.hasTeamship(Team.Werewolf)).toBe(true);
});

it('changes his role', () => {
	const changed = jest.fn();
	player.once('roleChanged', changed);
	player.setRole(Role.Villager);
	expect(player.getRole()).toBe(Role.Villager);
	expect(changed).toBeCalledWith(Role.Villager);
});

it('is killed', () => {
	const alive = jest.fn();
	player.once('aliveChanged', alive);
	expect(player.isAlive()).toBe(true);
	player.setAlive(false);
	expect(player.isAlive()).toBe(false);
	expect(alive).toBeCalledWith(false);
});
