import React, { useEffect, useState, useMemo } from "react";

/* APIs (BE simulation) */
import { Pokemon, getAll, getByName, PokemonWithPower } from "./API";

/*Utils */
import {
	calculatePower,
	CountOverThreshold,
	MaxPower,
	MinPower,
} from "./utils";

import PokemonTable from "./PokemonTable";

/* Styles */
import "./styles.css";

let appRenders = 0;
function App() {
	console.log("App renders ", appRenders++);
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);

	useEffect(() => {
		getAll().then((data) => setPokemon(data));
	}, []);

	/* Set up the pokemon with power */
	const pokemonWithPower = useMemo(
		() =>
			pokemon.map((p) => ({
				...p,
				power: calculatePower(p),
			})),
		[pokemon]
	);

	/* Handle threshold */
	const [threshold, setThreshold] = useState<number>(0);
	const handleChangeThreshold = (evt: React.ChangeEvent<HTMLInputElement>) =>
		setThreshold(parseInt(evt.target.value, 10) || 0);

	const countOverThreshold = useMemo(
		() => CountOverThreshold(pokemonWithPower, threshold),
		[pokemonWithPower, threshold]
	);

	/* Handle Min and Max */
	const min = useMemo(() => MinPower(pokemonWithPower), [pokemonWithPower]);
	const max = useMemo(() => MaxPower(pokemonWithPower), [pokemonWithPower]);

	/* Handle search */
	const [searchStr, setSearchStr] = useState<string>("");
	const handleChangeSearch = (evt: React.ChangeEvent<HTMLInputElement>) =>
		setSearchStr(evt.target.value);

	useEffect(() => {
		getByName(searchStr).then((data) => setPokemon(data));
	}, [searchStr]);

	return (
		<div>
			<div className="top-bar">
				<div>Search</div>
				<input type="text" value={searchStr} onChange={handleChangeSearch} />
				<div>Power threshold</div>
				<input type="text" value={threshold} onChange={handleChangeThreshold} />
				<div>Count over threshold: {countOverThreshold}</div>
			</div>
			<br />
			<hr />
			<div className="two-column">
				<PokemonTable pokemon={pokemonWithPower} />
				<div>
					<div>Min: {min}</div>
					<div>Max: {max}</div>
				</div>
			</div>
		</div>
	);
}

export default App;
