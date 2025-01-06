import type { Mark, Role } from '@asmodee/werewolf-model';

import type { Collection } from './Collection.js';
import type { Player, PlayerSkill } from './Player.js';

import type { DeathEvent } from '../event/DeathEvent.js';

import { Event } from '../event/Event.js';
import { EventDriver } from '../driver/EventDriver.js';
import { Period } from './Period.js';

export class Board extends EventDriver<Event> {
	protected players: Player[] = [];

	protected period = Period.Unknown;

	protected day = 0;

	protected collections: Collection<Board>[] = [];

	protected properties = new Map<string, unknown>();

	setProperty(name: string, value: unknown): void {
		this.properties.set(name, value);
	}

	getProperty(name: string): unknown {
		return this.properties.get(name);
	}

	setCollections(collections: Collection<Board>[]): void {
		this.collections = collections;
	}

	getCollections(): Collection<Board>[] {
		return this.collections;
	}

	setPlayers(players: Player[]): void {
		this.players = players;
	}

	getPlayers(): Player[] {
		return [...this.players];
	}

	findPlayers(condition: (player: Player) => boolean): Player[] {
		return this.players.filter(condition);
	}

	getAlivePlayers(): Player[] {
		return this.findPlayers((player) => player.isAlive());
	}

	getPlayer(seat: number): Player | undefined {
		return this.players[seat - 1];
	}

	getPeriod(): Period {
		return this.period;
	}

	isStarted(): boolean {
		return this.day > 0;
	}

	getDay(): number {
		return this.day;
	}

	async start(): Promise<void> {
		for (const player of this.getPlayers()) {
			this.giftPlayer(player, player.getRole());
		}
		await this.trigger(Event.GameStarted);
		await this.sunset();
	}

	async tick(): Promise<void> {
		if (this.period === Period.Day) {
			await this.sunset();
		} else {
			await this.sunrise();
		}
	}

	async sunset(): Promise<void> {
		this.day++;
		await this.trigger(Event.BeforeSunset);
		this.period = Period.Night;
		await this.trigger(Event.AfterSunset);
	}

	async sunrise(): Promise<void> {
		await this.trigger(Event.BeforeSunrise);
		this.period = Period.Day;
		await this.trigger(Event.AfterSunrise);
	}

	giftPlayer(player: Player, role: Role): void {
		for (const col of this.getCollections()) {
			const SkillCreators = col.get(role);
			if (!SkillCreators) {
				continue;
			}

			for (const SkillCreator of SkillCreators) {
				const skill = new SkillCreator(this, player);
				player.addSkill(skill);

				const effects = skill.getEffects();
				effects?.forEach((effect) => this.register(effect));
			}
		}
	}

	async killPlayer(victim: Player, reason: Mark): Promise<void> {
		if (!victim.isAlive()) {
			return;
		}
		const event: DeathEvent = {
			victim,
			reason,
		};
		await this.trigger(Event.BeforeDeath, event);
		victim.setAlive(false);
		await this.trigger(Event.AfterDeath, event);
	}

	getNextSkill(): PlayerSkill | undefined {
		let target: PlayerSkill | undefined;
		let priority = Number.POSITIVE_INFINITY;
		for (const player of this.getAlivePlayers()) {
			for (const skill of player.getSkills()) {
				if (!skill.isAvailable()) {
					continue;
				}
				if (skill.getPriority() < priority) {
					target = skill;
					priority = skill.getPriority();
				}
			}
		}
		return target;
	}
}
