import type { Progress } from './Progress.js';

export interface Vote {
	from: number;
	to: number;
}

export interface VoteBulletin {
	progress: Progress;
	votes?: Vote[];
}
