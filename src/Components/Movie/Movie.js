import React from 'react'
import './Movie.css';

const Movie = ({id, poster_path, backdrop_path, title, average_rating, release_date}) => {
  return (
    <section>
      <h1>{title}</h1>
    </section>
  )
}

export default Movie;


// "id": 475430,
// "poster_path": "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
// "backdrop_path": "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
// "title": "Artemis Fowl",
// "average_rating": 5,
// "release_date": "2020-06-12"