import GameConfig from './GameConfig.js';

interface RoomConfig extends GameConfig {
	id: number;
	salt: string;
	ownerKey?: string;
}

export default RoomConfig;
