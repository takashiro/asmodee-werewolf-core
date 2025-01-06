import { it, expect } from '@jest/globals';
import { Role, Vision } from '@asmodee/werewolf-model';

import { Board } from '@asmodee/werewolf-core/game/Board.js';
import { Player } from '@asmodee/werewolf-core/game/Player.js';
import { Period } from '@asmodee/werewolf-core/game/Period.js';

import standard from '@asmodee/werewolf-core/collection/standard/index.js';

const board = new Board();
board.setPlayers([
	new Player(1, Role.Werewolf),
	new Player(2, Role.Werewolf),
	new Player(3, Role.Werewolf),
	new Player(4, Role.Werewolf),
	new Player(5, Role.Villager),
	new Player(6, Role.Villager),
	new Player(7, Role.Villager),
	new Player(8, Role.Villager),
	new Player(9, Role.Seer),
	new Player(10, Role.Witch),
	new Player(11, Role.Guard),
	new Player(12, Role.Hunter),
]);
board.setCollections([standard]);

it('starts the game', async () => {
	await board.start();
	expect(board.getPeriod()).toBe(Period.Night);
	expect(board.getNextSkills()).toBeTruthy();
});

it('wakes up werewolves', async () => {
	const players = board.getPlayers();
	for (const player of players) {
		expect(player.isAlive()).toBe(true);
	}

	const skills = board.getNextSkills();
	expect(skills).toHaveLength(4);

	for (let i = 0; i < 4; i++) {
		expect(players[i].getSkill(0)).toBe(skills[i]);
	}

	const [skill] = skills;
	expect(skill.isFeasible([players[0], players[2]])).toBe(false);

	const targets = [players[7]];
	expect(skill.isFeasible(targets)).toBe(true);
	expect(skill.isAvailable()).toBe(true);
	await skill.execute([players[7]]);

	for (const sk of skills) {
		expect(sk.isAvailable()).toBe(false);
	}
});

it('wakes up seer', async () => {
	const skills = board.getNextSkills();
	expect(skills).toHaveLength(1);

	const [skill] = skills;
	expect(skill.isFeasible([])).toBe(false);

	const target = board.getPlayer(3)!;
	expect(skill.isFeasible([target])).toBe(true);

	const { players } = await skill.execute([target]) as Vision;
	expect(players).toHaveLength(1);
	const [seen] = players;
	expect(seen.role).toBe(Role.Werewolf);
	expect(seen.seat).toBe(3);
});

it('goes into dawn', async () => {
	expect(board.getNextSkills()).toHaveLength(0);
	await board.tick();
	expect(board.getPeriod()).toBe(Period.Day);

	const victim = board.getPlayer(8)!;
	expect(victim.isAlive()).toBe(false);

	const alivePlayers = board.getAlivePlayers();
	expect(alivePlayers).toHaveLength(11);
});
