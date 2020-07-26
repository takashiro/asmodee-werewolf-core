import Role from './Role';
import Team from './Team';

const ship = new Map<Role, Team>();

ship.set(Role.Unknown, Team.Unknown);
ship.set(Role.Werewolf, Team.Werewolf);
ship.set(Role.AlphaWolf, Team.Werewolf);
ship.set(Role.WhiteAlphaWolf, Team.Werewolf);
ship.set(Role.WolfBeauty, Team.Werewolf);
ship.set(Role.SecretWolf, Team.Werewolf);
ship.set(Role.Demon, Team.Werewolf);
ship.set(Role.Villager, Team.Villager);
ship.set(Role.Seer, Team.Villager);
ship.set(Role.Tamer, Team.Villager);
ship.set(Role.Witch, Team.Villager);
ship.set(Role.Hunter, Team.Villager);
ship.set(Role.Guard, Team.Villager);
ship.set(Role.Magician, Team.Villager);
ship.set(Role.Idiot, Team.Villager);
ship.set(Role.Elder, Team.Villager);
ship.set(Role.Knight, Team.Villager);
ship.set(Role.DreamWeaver, Team.Villager);
ship.set(Role.Rogue, Team.Villager);
ship.set(Role.Crow, Team.Villager);
ship.set(Role.Cupid, Team.Other);
ship.set(Role.FeralChild, Team.Other);
ship.set(Role.Thief, Team.Other);
ship.set(Role.Bombman, Team.Other);
ship.set(Role.Gargoyle, Team.Werewolf);
ship.set(Role.GraveyardKeeper, Team.Villager);
ship.set(Role.Tiangou, Team.Werewolf);
ship.set(Role.Luna, Team.Villager);
ship.set(Role.WolfGrandma, Team.Werewolf);
ship.set(Role.RedHat, Team.Villager);
ship.set(Role.Doppelganger, Team.Other);
ship.set(Role.Revenger, Team.Other);
ship.set(Role.Hybrid, Team.Other);
ship.set(Role.LunarApostle, Team.Werewolf);
ship.set(Role.MaraHunter, Team.Villager);
ship.set(Role.Nightmare, Team.Werewolf);
ship.set(Role.Scarlett, Team.Other);
ship.set(Role.MiracleMerchant, Team.Villager);

export default ship;