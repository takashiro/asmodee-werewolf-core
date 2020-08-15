import GameConfig from './GameConfig';

interface RoomConfig extends GameConfig {
	id: number;
	salt: string;
}

export default RoomConfig;
