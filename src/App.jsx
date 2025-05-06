import { use, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedMovies from "./components/WatchedMovies";
import Loading from "./components/Loading";

const KEY = "57ebaed5";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(true);
  const [iserror, setIsError] = useState("");
  const [movies, setMovies] = useState([]);
  let len = movies?.length;
  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovieID] = useState();
  const [closeTap, setCloseTap] = useState(true);
  const [exit, setExit] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState(() => {
    try {
      const storedValue = localStorage.getItem("watched");
      const parsed = storedValue ? JSON.parse(storedValue) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Error parsing localStorage", e);
      return [];
    }
  });

  function handleClose() {
    setCloseTap(!closeTap);
  }
  // solution of issues!!!!!
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok) throw new Error("Error Occured While Fetching Data");

          const data = await res.json();
          if (data.Response !== "True") throw new Error("No Response");

          setMovies(data.Search);
          setIsError("");
        } catch (error) {
          setIsError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Header
        setMovies={setMovies}
        setQuery={setQuery}
        query={query}
        len={len}
        setSearch={setSearch}
      />
      <div className="mainContent">
        {search ? (
          <Loading>Search To Show Movies ...</Loading>
        ) : isLoading ? (
          <Loading>LOADING ⌛</Loading>
        ) : iserror ? (
          <Loading>{`${iserror} ❗`}</Loading>
        ) : (
          <MovieList
            movies={movies}
            setSelectedMovieID={setSelectedMovieID}
            closeTap={closeTap}
            setCloseTap={setCloseTap}
            setExit={setExit}
          />
        )}

        {!exit ? (
          <WatchedMovies
            watchedMovies={watchedMovies}
            setWatchedMovies={setWatchedMovies}
          />
        ) : (
          <MovieDetails
            selectedMovieID={selectedMovieID}
            handleClose={handleClose}
            // userRating={userRating}
            // setUserRating={setUserRating}
            closeTap={closeTap}
            setExit={setExit}
            watchedMovies={watchedMovies}
            setWatchedMovies={setWatchedMovies}
          />
        )}
      </div>
    </>
  );
}

export default App;
