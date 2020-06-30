import React from 'react'
import './Movie.css';

const Movie = ({id, posterPath, backdropPath, title, averageRating, releaseDate}) => {
  
    return (
    <section>
      <ul>
        <li>{title}</li>
        <li>{averageRating}</li>
        <li>{id}</li>
        <li>{posterPath}</li>
        <li>{backdropPath}</li>
        <li>{releaseDate}</li>
      </ul>
    </section>
  )
}

export default Movie;