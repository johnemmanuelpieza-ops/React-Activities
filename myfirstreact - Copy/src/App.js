import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dogapi.dog/api/v2/breeds?filter[has_images]=true&page[size]=50")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dog data.");
        }
        return response.json();
      })
      .then((result) => setBreeds(result.data || []))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const filterBreeds = breeds.filter((breed) =>
    breed.attributes.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        <h2>Dog Wiki</h2>
        <p>Discover your favorite dog breeds.</p>
      </header>


      <main className="container">
        <input className="search"
          type="search" placeholder="Search for a dog breed..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="message">Loading dog breeds.</p>}
        {error && <p className="message">{error}</p>}
        {!loading && !error && (
          <div className="breed-grid">
            {filterBreeds.map((breed) => {
              const attributes = breed.attributes;
              const image = attributes.images?.[0];

              return (
                <article className="breed-card" key={breed.id}>
                  <img
                    src={
                      image?.medium ||
                      image?.url ||
                      "https://dogapi.dog/api/v2/breeds/image?size=medium"
                    }
                    alt={attributes.name}
                  />
                  <div className="breed-info">
                    <h2>{attributes.name}</h2>
                    <p>{attributes.description}</p>
                  </div>
                </article>
              );
            })}
            {filterBreeds.length === 0 && (
              <p className="message">No breeds found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;