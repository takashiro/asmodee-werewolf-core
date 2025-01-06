import { Role } from '@asmodee/werewolf-model';
import { Collection } from '../Collection.js';

import WerewolfAttack from './WerewolfAttack/index.js';
import { Seer } from './Seer.js';

const col = new Collection('standard');

col.set(Role.Werewolf, WerewolfAttack);
col.set(Role.Seer, Seer);

export default col;
