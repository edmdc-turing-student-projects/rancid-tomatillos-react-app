export const findMovieRating = (userRatings, movie, userId) => {
  if (!ratings.length) return <MovieRatingForm userId={userId} movieId={movie.id}/>
  const movieRating = ratings.find( rating => movie.id === rating.movie_id)
  return (movieRating) ? <MovieRatingForm userId={userId} movieId={movie.id} userRating={movieRating}/> : <MovieRatingForm userId={userId} movieId={movie.id} />
}