import { GameConfig } from './GameConfig.js';

export interface RoomConfig extends GameConfig {
	id: number;
	salt: string;
	ownerKey?: string;
}
