import React, { useState } from 'react'
import Movie from './Movie';

const MovieList = ({ movies, setSelectedMovieID, setCloseTap, setExit }) => {
  const [closeList, setCloseList] = useState(true);
  return (
    <div className="box">
      <button className="exit" onClick={() => setCloseList(!closeList)}>
        {closeList ? `-` : `+`}
      </button>
      <div className="movieList" style={closeList ? {} : { display: "none" }}>
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            setSelectedMovieID={setSelectedMovieID}
            setCloseTap={setCloseTap}
            setExit={setExit}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList
