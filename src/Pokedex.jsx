import React, { useState, useEffect } from 'react';

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      if (!response.ok) throw new Error('Failed to fetch Pokémon list');
      const data = await response.json();
      setPokemons(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (loading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pokedex">
      <h2>All Pokémon</h2>
      <ul>
        {pokemons.map((pokemon) => {
          // Extraer el ID de la URL
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return (
            <li key={pokemon.name}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={pokemon.name}
              />
              {pokemon.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pokedex;
