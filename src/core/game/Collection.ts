import { Role } from '@asmodee/werewolf-model';

import type { Player } from './Player.js';
import type { Skill } from './Skill.js';

export type SkillCreator<DriverType> = new(driver: DriverType, owner: Player) => Skill<DriverType, Player>;

export class Collection<DriverType> {
	protected skills = new Map<Role, SkillCreator<DriverType>[]>();

	constructor(protected readonly name: string) {
	}

	getName(): string {
		return this.name;
	}

	set(role: Role, ...skills: SkillCreator<DriverType>[]): void {
		this.skills.set(role, skills);
	}

	get(role: Role): SkillCreator<DriverType>[] | undefined {
		return this.skills.get(role);
	}
}
