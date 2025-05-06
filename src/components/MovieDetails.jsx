import React, { useEffect, useState } from "react";
import Stars from "./Stars";
import Loading from "./Loading";

const KEY = "57ebaed5";
const MovieDetails = ({
  selectedMovieID,
  handleClose,
  closeTap,
  // userRating,
  // setUserRating,
  setExit,
  watchedMovies,
  setWatchedMovies,
}) => {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedMovieID);
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedMovieID
  )?.userRate;

  function addToList() {
    setWatchedMovies([
      ...watchedMovies,
      { ...selectedMovie, userRate: userRating },
    ]);
    localStorage.setItem(
      "watched",
      JSON.stringify([
        ...watchedMovies,
        { selectedMovie, userRate: userRating },
      ])
    );
    setExit(false);
  }
  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieID}`
          );
          if (!res.ok) throw new Error("can't fetch movie");
          const data = await res.json();
          if (data.Response === false) throw new Error("no data");
          setSelectedMovie(data);
          setErrorMsg("");
        } catch (error) {
          setErrorMsg(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchMovieDetails();
    },
    [selectedMovieID]
  );

  return (
    <>
      {loading ? (
        <Loading>LOADING ⌛</Loading>
      ) : errorMsg ? (
        <Loading>{errorMsg}</Loading>
      ) : (
        <div className="rightBox">
          <button className="exit" onClick={() => handleClose()}>
            {closeTap ? `-` : `+`}
          </button>
          <div style={closeTap && selectedMovieID ? {} : { display: "none" }}>
            <div className="movieDetailsCard">
              <button className="return" onClick={() => setExit(false)}>
                ⬅
              </button>
              <div className="movieDetailsImage">
                <img src={selectedMovie?.Poster} alt="" />
              </div>

              <div className="movieDetail">
                <h1 className="name">{selectedMovie?.Title}</h1>
                <div className="date">
                  {`${selectedMovie?.Released}.${selectedMovie?.Runtime}`}
                </div>
                <div className="type">{selectedMovie?.Genre}</div>
                <div className="IMBDrating">{`⭐ ${selectedMovie?.imdbRating} IMBD Rating`}</div>
              </div>
            </div>
            <div className="movieBrief">
              <div className="ratingBox">
                <div
                  className="starsRating"
                  style={isWatched ? { display: "none" } : {}}
                >
                  <Stars
                    setUserRating={setUserRating}
                    setTempRating={setTempRating}
                    userRating={userRating}
                    tempRating={tempRating}
                  />
                  <p className="star">
                    {tempRating ? tempRating : userRating ? userRating : ""}
                  </p>
                </div>
                <button
                  className="add"
                  style={userRating && !isWatched ? {} : { display: "none" }}
                  onClick={() => addToList()}
                >
                  + Add to watched list
                </button>
                <button
                  className="add"
                  style={isWatched ? {} : { display: "none" }}
                >{`You Rated This Movie With ${watchedUserRating} Stars🌟`}</button>
              </div>
              <div className="plot">{selectedMovie?.Plot}</div>
              <div className="actors">{selectedMovie?.Actors}</div>
              <div className="directed">
                {`Directed By ${selectedMovie?.Director}`}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
