import React from "react";

const Movie = ({ movie, setSelectedMovieID, setCloseTap, setExit }) => {
  function handleSelect() {
    setSelectedMovieID(movie.imdbID);
    setCloseTap(true);
    setExit(true);
  }
  return (
    <div className="movie" onClick={() => handleSelect()}>
      <div className="movieImage">
        <img src={movie?.Poster} alt="" />
      </div>
      <div className="moviedata">
        <div className="movieName">{movie?.Title}</div>
        <div className="movieYear">{movie?.Year}</div>
      </div>
    </div>
  );
};

export default Movie;
