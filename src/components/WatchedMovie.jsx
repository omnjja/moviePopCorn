import React from 'react'

const WatchedMovie = ({ watchedMovie, watchedMovies, setWatchedMovies }) => {
    function handleRemoveMovie(id) {
        setWatchedMovies(watchedMovies.filter((w) => w.imdbID !== id));
      }
      return (
        <div className="watchedMovie">
          <button
            className="exit"
            onClick={() => handleRemoveMovie(watchedMovie.imdbID)}
          >
            ❌
          </button>
          <div className="movieImage">
            <img src={watchedMovie.Poster} alt="" />
          </div>
          <div className="moviedata">
            <div className="movieName">{watchedMovie.Title}</div>
            <div className="statistics">
              <div className="IMBDRating">{`⭐ ${watchedMovie.imdbRating}`}</div>
              <div className="userRating">{`🌟 ${watchedMovie.userRate}`}</div>
              <div className="time">{`⌛ ${watchedMovie.Runtime}`}</div>
            </div>
          </div>
        </div>
      );
}

export default WatchedMovie
