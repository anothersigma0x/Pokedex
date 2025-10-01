import React, { useState } from 'react';

function Search() {
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!input.trim()) {
      setError('Please enter a Pokémon name');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setPokemon(null);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokémon not found');
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <h2>Search a Pokémon</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Pokémon name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pokemon && (
        <div className="pokemon-card">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}

export default Search;