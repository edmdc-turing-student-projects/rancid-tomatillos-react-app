import React from 'react'
import Movie from '../Movie/Movie.js';

const Movies = ({ movies }) => {
  // console.log(getAllMovies(), 'movies')
//   getAllMovies()
if (!movies) {
    return <h2>No Movies Yet</h2>
}
  console.log(movies, 'movies');
  const movieResults = movies.map(movie => {
    return (
      <Movie title={movie.title}/>
    )
  })

  return (
    <section>
      {movieResults.length && movieResults}
    </section>
  )
}

export default Movies;
