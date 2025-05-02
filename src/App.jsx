import { use, useEffect, useState } from "react";
import "./App.css";
import { CiStar } from "react-icons/ci";

const KEY = "57ebaed5";
function App() {
  const [movies, setMovies] = useState([]);
  let len = movies?.length;
  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovieID] = useState();
  const [closeTap, setCloseTap] = useState(true);
  const [exit, setExit] = useState(true);


  function handleClose() {
    setCloseTap(!closeTap);
  }
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok) throw new Error("enable to fetch");

          const data = await res.json();
          if (data.Response === false) throw new Error("no response");

          setMovies(data.Search);
        } catch (error) {
          console.log(error.message);
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
      />
      <div className="mainContent">
        <MovieList
          movies={movies}
          setSelectedMovieID={setSelectedMovieID}
          closeTap={closeTap}
          setCloseTap={setCloseTap}
          setExit={setExit}
        />
        {exit ? (
          <MovieDetails
            selectedMovieID={selectedMovieID}
            handleClose={handleClose}
            // userRating={userRating}
            // setUserRating={setUserRating}
            closeTap={closeTap}
            setExit={setExit}
          />
        ) : (
          <WatchedMovies />
        )}
      </div>
      <p className="warning">❗ HAVE NOT FINISHED YET ❗</p>
    </>
  );
}

function Header({ setMovies, setQuery, query, len }) {
  return (
    <div className="header">
      <div className="logo">🎭 PopCorn</div>
      <Search setMovies={setMovies} setQuery={setQuery} query={query} />
      <div className="found">{`Found ${len ? len : 0} results`}</div>
    </div>
  );
}

function Search({ setQuery, query }) {
  return (
    <input
      className="search"
      type="text"
      name=""
      placeholder="search ..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function MovieList({ movies, setSelectedMovieID, setCloseTap, setExit }) {
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

function Movie({ movie, setSelectedMovieID, setCloseTap, setExit }) {
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
}

function MovieDetails({
  selectedMovieID,
  handleClose,
  closeTap,
  // userRating,
  // setUserRating,
  setExit,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
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
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchMovieDetails();
    },
    [selectedMovieID]
  );
  return (
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
            <div className="IMBDrating">{`✨ ${selectedMovie?.imdbRating} IMBD Rating`}</div>
          </div>
        </div>
        <div className="movieBrief">
          <div className="ratingBox">
            <div className="starsRating">
              <Stars
                setUserRating={setUserRating}
                setTempRating={setTempRating}
              />
              <p className="star">
                {tempRating ? tempRating : userRating ? userRating : ""}
              </p>
            </div>
            <button className="add" style={userRating? {} : {display: "none"}}>+ Add to watched list</button>
          </div>
          <div className="plot">{selectedMovie?.Plot}</div>
          <div className="actors">{selectedMovie?.Actors}</div>
          <div className="directed">
            {`Directed By ${selectedMovie?.Director}`}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stars({ setUserRating, setTempRating }) {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1px",
  };
  function handleUserRating(i) {
    setUserRating(i + 1);
    setTempRating(0);
  }
  return (
    <div className="star">
      {Array.from({ length: 10 }, (_, i) => (
        <Star
          key={i}
          onClick={() => handleUserRating(i)}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
        /> // should path the onclick to the star component
      ))}
    </div>
  );
}

function Star({ onClick, onHoverIn, onHoverOut }) {
  const starContainerStyle = {
    display: "flex",
    flexBasis: "center",
    width: "30px",
    height: "30px",
  };
  let fill = true;
  return (
    <div
      style={starContainerStyle}
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {fill ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"

          // fill={"yellow"}
          // stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"

          // stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </div>
  );
}

function WatchedMovies() {
  const [closeWatched, setClosWatched] = useState(true);
  return (
    <div className="card">
      <button className="exit" onClick={() => setClosWatched(!closeWatched)}>
        {closeWatched ? `-` : `+`}
      </button>
      <div style={closeWatched ? {} : { display: "none" }}>
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
    </div>
  );
}

export default App;
