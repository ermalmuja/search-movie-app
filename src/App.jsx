import viteLogo from "/vite.svg";
import MovieCard from "./MovieCard";
import "./App.css";
import "./index.css";
import SearchIcon from "./search.svg";
import { useState, useEffect } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    setIsLoading(true);
    const response = await fetch(
      `http://www.omdbapi.com?apikey=b41aa2a1&s=${title}`
    );

    const data = await response.json();
    setIsLoading(false);
    setMovies(data.Search);
  };
  if (isLoading) {
    return (
      <div className="app">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="container app">
      <h1>Search Movie</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
