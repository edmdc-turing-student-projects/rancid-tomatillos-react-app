import MovieRatingForm from "./Components/MovieRatingForm/MovieRatingForm"
import React from "react";

export const findMovieRating = (userRatings, movie, userId) => {
  if (!userRatings.length) return <MovieRatingForm userId={userId} movieId={movie.id}/>

  const movieRating = userRatings.find( rating => movie.id === rating.movie_id)

  return (movieRating) ? (
    <MovieRatingForm userId={userId} movieId={movie.id} userRating={movieRating}/>
  ) : (
    <MovieRatingForm userId={userId} movieId={movie.id} />
  )
}

export const formatDate = (releaseDate) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(releaseDate).toLocaleString(
    "en-US",
    options
  );
  return `Released on ${formattedDate}`;
}

export const findComments = (comments,movie_id) => {
  const movieComments = comments.filter(comment => comment.movie_id === movie_id)
  
  return movieComments.map(comment => {
    return ( 
      <section className="comments">
        <p>{comment.comment}</p>
        <p className="author">User: <i>{comment.author}</i></p>
      </section>
    );
  })
}