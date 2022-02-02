import { Pokemon, PokemonWithPower } from "./API";

export const calculatePower = (pokemon: Pokemon): number =>
	pokemon.hp +
	pokemon.attack +
	pokemon.defense +
	pokemon.special_attack +
	pokemon.special_defense +
	pokemon.speed;

export const CountOverThreshold = (
	pokemonWithPower: PokemonWithPower[],
	threshold: number
): number => pokemonWithPower.filter((p) => p.power > threshold).length;

export const MinPower = (pokemonWithPower: PokemonWithPower[]): number =>
	Math.min(...pokemonWithPower.map((p) => p.power));

export const MaxPower = (pokemonWithPower: PokemonWithPower[]): number =>
	Math.max(...pokemonWithPower.map((p) => p.power));

