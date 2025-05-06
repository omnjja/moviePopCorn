import React, { useState } from "react";
import WatchedMovie from "./WatchedMovie";

const average = (arr) => {
  const nums = arr.map(Number).filter((n) => !isNaN(n));
  return nums.reduce((acc, cur) => acc + cur / nums.length, 0);
};

const WatchedMovies = ({ watchedMovies, setWatchedMovies }) => {
  const [closeWatched, setClosWatched] = useState(true);
  const numOfMovies = watchedMovies?.length;
  const [avgIMBDrating, setAvgIMBDrating] = useState(
    average(watchedMovies.map((wat) => wat.imdbRating))
  );
  const [avgUserRating, setAvgUserRating] = useState(
    average(watchedMovies.map((wat) => wat.userRate))
  );
  const [avgTime, setAvgTime] = useState(
    average(watchedMovies.map((wat) => Number(wat?.Runtime?.split(" ")[0])))
  );

  return (
    <div className="card">
      <button className="exit" onClick={() => setClosWatched(!closeWatched)}>
        {closeWatched ? `-` : `+`}
      </button>
      <div style={closeWatched ? {} : { display: "none" }}>
        <div className="allWatched">
          <h1>Movies You Have Wathced</h1>
          <div className="statistics">
            <div className="count">{`${numOfMovies} Movies`}</div>
            <div className="IMBDavgRating">{`⭐ ${avgIMBDrating}`}</div>
            <div className="userAvgRating">{`🌟 ${avgUserRating}`}</div>
            <div className="avgTime">{`⌛ ${avgTime} min`}</div>
          </div>
          {watchedMovies?.map((watchedMovie) => (
            <WatchedMovie
              key={watchedMovie.imdbID}
              watchedMovie={watchedMovie}
              watchedMovies={watchedMovies}
              setWatchedMovies={setWatchedMovies}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchedMovies;
