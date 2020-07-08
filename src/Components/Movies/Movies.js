import React from "react";
import Movie from "../Movie/Movie.js";
import "./Movies.css";
import { Link } from "react-router-dom";

const Movies = ({ movies, userId }) => {
  const movieResults = movies.map((movie, index) => {
    return (
      <li id={movie.id} key={index}>
        <Link to={`/movies/${movie.id}`}>
          <Movie
            title={movie.title}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            averageRating={movie.average_rating}
            releaseDate={movie.release_date}
            userId = {userId}
          />
        </Link>
      </li>
    );
  });

  return (
    <section>
      <ul>{movieResults.length && movieResults}</ul>
    </section>
  );
};

export default Movies;
