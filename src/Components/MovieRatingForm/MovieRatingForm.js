import React, { Component } from "react";
import "./MovieRatingForm.css";
import { addRating, deleteRating } from "../../apiCalls";

class MovieRatingForm extends Component {
  constructor({ movieId, userId, userRating = null }) {
    super();
    this.state = {
      movieId: movieId,
      userRating: userRating,
      rating: null,
      userId: userId,
      error: ""
    }
  }

  formInputs = () => {
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
            value={score}
            defaultChecked={false}
          />
        </>
      )
    })
  }

  changeHandler = (event) => {
    this.setState({ rating:  event.target.value})
  }

 postMovieRating = async () => {
   const movieInfo = {
     movie_id: parseInt(this.state.movieId),
     rating: parseInt(this.state.rating)
   }
    try {
      const response = await addRating(this.state.userId, movieInfo);
      this.setState({userRating: response.rating})
    } catch(error)  {
      this.setState({ error: error });
    }
  }

  deleteMovieRating = async () => {
    try {
      const response = await deleteRating(this.state.userId, this.state.userRating.id)
      this.setState({userRating: null});
      console.log(response)
    } catch (error) {
      this.setState({error: error});
    }
  }

  userMovieRatingFragment = () => {
    return (
      <>
        <p><strong>Your Rating:</strong> {this.state.userRating.rating}</p>
        <button
          onClick={this.deleteMovieRating}
          title="delete rating"
        >
        Delete
        </button>
      </>
    )
  }

  movieRatingFormFragment = () => {
    return (
      <>
        <form
          title="submit a movie rating"
          onChange={this.changeHandler}
        >
          {this.formInputs()}
          <button
            onClick={() => this.postMovieRating()}
            type="button"
          >
            Submit Review
          </button>
        </form>
      </>
    )
  }

  render() {
    return (
      (this.state.userRating) ? this.userMovieRatingFragment() : this.movieRatingFormFragment()
    )
  }
}

export default MovieRatingForm;
