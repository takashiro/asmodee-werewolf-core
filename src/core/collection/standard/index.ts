
import { Role } from '@asmodee/werewolf-model';
import { Collection } from '../Collection.js';
import WerewolfAttack from './WerewolfAttack/index.js';

const col = new Collection('standard');

col.set(Role.Werewolf, WerewolfAttack);

export default col;
