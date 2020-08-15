import GameConfig from './GameConfig';

interface RoomConfig extends GameConfig {
	id: number;
	salt: string;
	ownerKey?: string;
}

export default RoomConfig;
