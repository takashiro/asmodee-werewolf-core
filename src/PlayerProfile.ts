import type { Role } from './Role.js';

export interface PlayerProfile {
	seat: number;
	role: Role;
	alive?: boolean;
}
