import { EventEmitter } from 'events';
import type {
	Role,
	Team,
} from '@asmodee/werewolf-model';
import { Teamship } from '@asmodee/werewolf-model/Teamship.js';

import type Skill from './Skill.js';

export interface Player {
	on(event: 'roleChanged', listener: (role: Role) => void): this;
	on(event: 'aliveChanged', listener: (alive: boolean) => void): this;

	once(event: 'roleChanged', listener: (role: Role) => void): this;
	once(event: 'aliveChanged', listener: (alive: boolean) => void): this;

	off(event: 'roleChanged', listener: (role: Role) => void): this;
	off(event: 'aliveChanged', listener: (alive: boolean) => void): this;

	emit(event: 'roleChanged', role: Role): boolean;
	emit(event: 'aliveChanged', alive: boolean): boolean;
}

export type PlayerSkill = Skill<unknown, Player>;

export class Player extends EventEmitter {
	protected seat: number;

	protected role: Role;

	protected alive = true;

	protected deathDate?: number;

	protected skills: PlayerSkill[] = [];

	constructor(seat: number, role: Role) {
		super();

		this.seat = seat;
		this.role = role;
	}

	/**
	 * @returns Seat number (starting from 1)
	 */
	getSeat(): number {
		return this.seat;
	}

	/**
	 * Sets player role.
	 * @param role role
	 */
	setRole(role: Role): void {
		this.role = role;
		this.emit('roleChanged', role);
	}

	/**
	 * @returns Player role
	 */
	getRole(): Role {
		return this.role;
	}

	/**
	 * Check if the player is on some team.
	 * @param team team
	 * @returns Whether the player is on the team.
	 */
	hasTeamship(team: Team): boolean {
		return Teamship.get(this.role) === team;
	}

	/**
	 * @returns Whether the player is alive.
	 */
	isAlive(): boolean {
		return this.alive;
	}

	/**
	 * Sets alive to true or false.
	 * @param alive
	 */
	setAlive(alive: boolean): void {
		this.alive = alive;
		this.emit('aliveChanged', alive);
	}

	/**
	 * @returns The date when the player is killed.
	 */
	getDeathDate(): number | undefined {
		return this.deathDate;
	}

	/**
	 * Sets death date.
	 * @param date The date when the player is killed.
	 */
	setDeathDate(date: number): void {
		this.deathDate = date;
	}

	/**
	 * @returns Player skills
	 */
	getSkills(): PlayerSkill[] {
		return this.skills;
	}

	/**
	 * Gets a skill by index.
	 * @param index skill index
	 * @returns Player skill
	 */
	getSkill(index: number): PlayerSkill | undefined {
		return this.skills[index];
	}

	/**
	 * Add a skill.
	 * @param skill Player skill
	 */
	addSkill(skill: PlayerSkill): void {
		this.skills.push(skill);
	}

	/**
	 * Remove some skills.
	 * @param condition Check if the skill should be removed.
	 */
	removeSkill(condition: (skill: PlayerSkill) => boolean): void {
		this.skills = this.skills.filter(condition);
	}
}

export default Player;
