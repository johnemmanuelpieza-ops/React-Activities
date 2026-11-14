import React, { useEffect, useState } from "react";
import "./App.css";

import {
  getFavorites,
  saveFavorite,
  removeFavorite,
} from "./firebase/favoritesService";

const API_URL = "https://dogapi.dog/api/v2/breeds";

function App() {
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState("");
  const [page, setPage] = useState(1);

  // Fetch dog breeds from the external API
  async function fetchDogs(pageNumber = 1) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?page%5Bnumber%5D=${pageNumber}&page%5Bsize%5D=12&filter%5Bhas_images%5D=true`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch dog breeds.");
      }

      const result = await response.json();

      const breedList = result.data.map((item) => {
        const attributes = item.attributes;
        const image = attributes.images?.[0];

        return {
          id: item.id,
          name: attributes.name,
          description:
            attributes.description || "No description available.",
          imageUrl: image?.medium || image?.url || "",
          imageAttribution: image?.attribution || null,
          life: attributes.life || null,
          hypoallergenic: attributes.hypoallergenic ?? false,
          origin: attributes.origin || null,
        };
      });

      setDogs(breedList);
      setPage(pageNumber);
    } catch (err) {
      console.error("Dog API error:", err);
      setError("Unable to load dog breeds. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Retrieve saved favorites from Firestore
  async function fetchFavorites() {
    try {
      const savedBreeds = await getFavorites();
      setFavorites(savedBreeds);
    } catch (err) {
      console.error("Firebase read error:", err);
      setError(
        "Unable to load favorites. Check your Firebase configuration and security rules."
      );
    }
  }

  // Load data when the application starts
  useEffect(() => {
    fetchDogs(1);
    fetchFavorites();
  }, []);

  // Save or remove a breed when the heart is clicked
  async function toggleFavorite(breed) {
    const isFavorite = favorites.some(
      (favorite) => favorite.id === breed.id
    );

    setSaving(breed.id);
    setError("");

    try {
      if (isFavorite) {
        await removeFavorite(breed.id);

        setFavorites((current) =>
          current.filter((favorite) => favorite.id !== breed.id)
        );
      } else {
        await saveFavorite(breed);

        setFavorites((current) => [...current, breed]);
      }
    } catch (err) {
      console.error("Firebase write error:", err);
      setError(
        "Unable to update favorites. Please check your Firebase setup."
      );
    } finally {
      setSaving("");
    }
  }

  function changePage(nextPage) {
    fetchDogs(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">DOG DISCOVERY</p>
          <h1>Find Your Favorite Dogs</h1>
          <p className="subtitle">
            Explore dog breeds and save the ones you love.
          </p>
        </div>

        <div className="favorite-count">
          <span aria-hidden="true">♥</span>{" "}
          {favorites.length} Favorites
        </div>
      </header>

      <section className="toolbar">
        <div>
          <h2>Explore Breeds</h2>
          <p className="page-label">Page {page}</p>
        </div>

        <button
          className="refresh-button"
          onClick={() => changePage(page + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Discover More Dogs →"}
        </button>
      </section>

      {error && (
        <div className="error" role="alert">
          {error}
          <button
            className="retry-button"
            onClick={() => {
              fetchDogs(page);
              fetchFavorites();
            }}
          >
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="status-message">
          <p>Fetching dog breeds...</p>
        </div>
      ) : dogs.length === 0 ? (
        <div className="status-message">
          <p>No dog breeds found on this page.</p>
        </div>
      ) : (
        <section className="dog-grid">
          {dogs.map((dog) => {
            const isFavorite = favorites.some(
              (favorite) => favorite.id === dog.id
            );

            return (
              <article className="dog-card" key={dog.id}>
                <div className="image-container">
                  {dog.imageUrl ? (
                    <img
                      src={dog.imageUrl}
                      alt={dog.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="image-placeholder">
                      No image available
                    </div>
                  )}

                  <button
                    type="button"
                    className={`heart ${
                      isFavorite ? "active" : ""
                    }`}
                    onClick={() => toggleFavorite(dog)}
                    disabled={saving === dog.id}
                    aria-label={
                      isFavorite
                        ? `Remove ${dog.name} from favorites`
                        : `Add ${dog.name} to favorites`
                    }
                    title={
                      isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {saving === dog.id
                      ? "..."
                      : isFavorite
                      ? "♥"
                      : "♡"}
                  </button>
                </div>

                <div className="dog-info">
                  <h3>{dog.name}</h3>

                  <p className="description">
                    {dog.description}
                  </p>

                  {dog.life && (
                    <p className="detail">
                      <strong>Life expectancy:</strong>{" "}
                      {dog.life.min}–{dog.life.max} years
                    </p>
                  )}

                  {dog.origin?.country && (
                    <p className="detail">
                      <strong>Origin:</strong>{" "}
                      {dog.origin.country}
                    </p>
                  )}

                  <p
                    className={`favorite-status ${
                      isFavorite ? "saved" : ""
                    }`}
                  >
                    {isFavorite
                      ? "♥ Saved to favorites"
                      : "♡ Click the heart to save"}
                  </p>

                  {dog.imageAttribution && (
                    <p className="attribution">
                      Photo: {dog.imageAttribution.author || "Unknown"}{" "}
                      {dog.imageAttribution.license_url ? (
                        <>
                          ·{" "}
                          <a
                            href={dog.imageAttribution.license_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {dog.imageAttribution.license}
                          </a>
                        </>
                      ) : (
                        dog.imageAttribution.license
                      )}
                      {dog.imageAttribution.source_url && (
                        <>
                          {" "}·{" "}
                          <a
                            href={dog.imageAttribution.source_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Source
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}

      <footer className="pagination">
        <button
          className="page-button"
          onClick={() => changePage(page - 1)}
          disabled={loading || page <= 1}
        >
          ← Previous
        </button>

        <span>Page {page}</span>

        <button
          className="page-button"
          onClick={() => changePage(page + 1)}
          disabled={loading}
        >
          Next →
        </button>
      </footer>

      <footer className="app-footer">
        <p>
          Dog Discovery · React, Dog API v2 and Firebase Firestore
        </p>
      </footer>
    </main>
  );
}

export default App;