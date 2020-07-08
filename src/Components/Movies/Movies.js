import React from "react";
import Movie from "../Movie/Movie.js";
import "./Movies.css";
import { Link } from "react-router-dom";

const Movies = ({ movies, ratings }) => {
  const findMovieRating = (movie) => {
    if (!ratings.length) return movieRatingForm()
    const movieRating = ratings.find( rating => movie.id === rating.movie_id)
    return (movieRating) ? <h5> Rating </h5> : movieRatingForm()
  }

  const movieRatingForm = () => {
    const formInputs = () => {
      const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      return scores.map((score) => {
        return (
              <>
               <label htmlFor={`ratingChoice${score}`}>{score}</label>
               <input 
                   key="score"
                   type="radio" 
                   id={`ratingChoice${score}`}
                   name="rating" 
                   value={score}/>
              </>
        )
      })
    }
    return <form>{formInputs()}</form>;
  }

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
          />
        </Link>
        {(ratings) ? findMovieRating(movie) : null}
      </li>
    );
  });

  return (
    <section data-testid="movies-section">
      <ul>{movieResults.length && movieResults}</ul>
    </section>
  );
};

export default Movies;
