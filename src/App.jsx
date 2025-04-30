import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="mainContent">
        <MovieList />
        <MovieDetails />
        {/* <WatchedMovies /> */}
      </div>
      <p className="warning">❗ HAVE NOT FINISHED YET ❗</p>
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="logo">🎭 PopCorn</div>
      <Search />
      <div className="found">Found X results</div>
    </div>
  );
}

function Search() {
  return (
    <input
      className="search"
      type="text"
      name=""
      id=""
      placeholder="search ..."
    />
  );
}

function MovieList() {
  let movies = [
    { movieID: 1, movieName: "inception", year: "2010" },
    { movieID: 2, movieName: "interstaller", year: "2020" },
  ];
  return (
    <div className="leftBox">
      <button className="exit">-</button>
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.movieID} />
      ))}
    </div>
  );
}

function Movie({ movie }) {
  return (
    <div className="movie">
      <div className="movieImage">
        <img
          src="https://static1.moviewebimages.com/wordpress/wp-content/uploads/movie/i0DBDLhuWiY4ue0we5ebwb0W6gxRJF.jpg"
          alt=""
        />
      </div>
      <div className="moviedata">
        <div className="movieName">{movie.movieName}</div>
        <div className="movieYear">{movie.year}</div>
      </div>
    </div>
  );
}

function MovieDetails() {
  return (
    <div className="rightBox">
      <div className="movieDetailsCard">
        <button className="return">⬅</button>
        <div className="movieDetailsImage">
          <img
            src="https://c8.alamy.com/comp/2RAGC2N/oppenheimer-us-dolby-cinema-poster-cillian-murphy-as-j-robert-oppenheimer-2023-universal-pictures-courtesy-everett-collection-2RAGC2N.jpg"
            alt=""
          />
        </div>
        <button className="exit">-</button>
        <div className="movieDetail">
          <h1 className="name">oppenhimmer</h1>
          <div className="date">18 july 140 min</div>
          <div className="type">adventure, horror, war</div>
          <div className="IMBDrating">4.4✨IMBD Rating</div>
        </div>
      </div>
      <div className="movieBrief">
        <div className="starsRating">*******</div>
        <div className="brief">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          recusandae ducimus exercitationem saepe numquam unde sed maxime
          possimus rem tempore natus nemo officia sunt ipsum suscipit, assumenda
          magnam quas ab?
        </div>
        <div className="brief">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          recusandae ducimus exercitationem saepe numquam unde sed maxime
          possimus rem tempore natus nemo officia sunt ipsum suscipit, assumenda
          magnam quas ab?
        </div>
      </div>
    </div>
  );
}

function WatchedMovies() {
  return (
    <div className="card">
      <button className="exit">-</button>
      <div className="allWatched">
        <div>movies u have wathced</div>
        <div className="statistics">
          <div className="count">2 movies</div>
          <div className="IMBDavgRating">8.3 </div>
          <div className="userAvgRating">5.3</div>
          <div className="avgTime">81.5 mins</div>
        </div>
      </div>
      <div className="watchedMovie">
        <button className="exit">❌</button>
        <div className="movieImage">
          <img
            src="https://c8.alamy.com/comp/2RAGC2N/oppenheimer-us-dolby-cinema-poster-cillian-murphy-as-j-robert-oppenheimer-2023-universal-pictures-courtesy-everett-collection-2RAGC2N.jpg"
            alt=""
          />
        </div>
        <div className="moviedata">
          <div className="movieName">movie name</div>
          <div className="statistics">
            <div className="IMBDRating">8.3 </div>
            <div className="userRating">5.3</div>
            <div className="time">81.5 mins</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
