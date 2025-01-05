import {
	jest,
	expect,
	it,
} from '@jest/globals';

import { EventDriver } from '@asmodee/werewolf-core/driver/EventDriver.js';
import { EventListener } from '@asmodee/werewolf-core/driver/EventListener.js';

const enum GameEvent {
	U,
	A,
	B,
}

class Listener extends EventListener<GameEvent, unknown> {
	async process(): Promise<void> {
		// do nothing
	}
}

const driver = new EventDriver();
const l1 = new Listener(GameEvent.A);
const l2 = new Listener(GameEvent.B);
const l3 = new Listener(GameEvent.B);

const p1 = jest.spyOn(l1, 'process');
const p2 = jest.spyOn(l2, 'process');
const p3 = jest.spyOn(l3, 'process');

it('registers 2 listeners', () => {
	driver.register(l1);
	driver.register(l2);
	driver.register(l3);
});

it('triggers GameEvent.A', async () => {
	await driver.trigger(GameEvent.A);
	expect(p1).toHaveBeenCalledTimes(1);
	expect(p2).not.toHaveBeenCalled();
	expect(p3).not.toHaveBeenCalled();
	p1.mockClear();
});

it('triggers GameEvent.B', async () => {
	const data = { t: 3 };
	await driver.trigger(GameEvent.B, data);
	expect(p1).not.toHaveBeenCalled();
	expect(p2).toBeCalledTimes(1);
	expect(p2).toBeCalledWith(data);
	expect(p3).toBeCalledTimes(1);
	expect(p3).toBeCalledWith(data);
	p2.mockClear();
	p3.mockClear();
});

it('triggers GameEvent.U', async () => {
	await driver.trigger(GameEvent.U);
});
