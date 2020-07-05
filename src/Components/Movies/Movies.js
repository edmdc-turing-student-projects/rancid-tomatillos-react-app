import React from 'react'
import Movie from '../Movie/Movie.js';

const Movies = ( props ) => {
  const movieResults = props.movies.map((movie, index) => {
    return (
      <Movie 
        title={movie.title}
        posterPath={movie.poster_path}
        backdropPath={movie.backdrop_path}
        averageRating={movie.average_rating}
        releaseDate={movie.release_date}
        id={movie.id}
        key={index}
        />
    )
  })

  return (
    <section>
      {movieResults.length && movieResults}
    </section>
  )
}

export default Movies;
