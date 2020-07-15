import React, { Component } from "react";
import "./MovieRatingForm.css";
import { addRating, deleteRating, movieRatingsRequests } from "../../apiCalls";

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
        <option
          key={score}
          type="radio"
          id={`ratingChoice${score}`}
          name="rating"
          value={score}
          defaultChecked={false}
        >
          {score}
        </option>
      )
    })
  }

  changeHandler = (event) => {
    this.setState({ rating:  event.target.value})
  }

  postMovieRating = async (event) => {
    event.preventDefault();
    const movieInfo = {
      movie_id: this.state.movieId,
      rating: parseInt(this.state.rating)
    }
     try {
       const response = await addRating(this.state.userId, movieInfo);
       this.setState({userRating: response.rating})
     } catch(error)  {
       this.setState({ error: error });
     }
   }

  deleteMovieRating = async() => {
    try {
      const {ratings} = await movieRatingsRequests(this.state.userId)
      const movieRating = () => {
        for (let rating of ratings) {
          if (rating.user_id === this.state.userId && rating.movie_id === this.state.movieId) {
            return rating
          }
        }
      }
      this.setState({userRating: null});
      const response = await deleteRating(this.state.userId, movieRating().id)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  userMovieRatingFragment = () => {
    return (
      <>
        <p><strong>Your Rating:</strong> {this.state.userRating.rating}</p>
        <button
          onClick={() => this.deleteMovieRating()}
          title="delete rating"
        >
        Delete
        </button>
      </>
    )
  }

  movieRatingFormFragment = () => {
    return (
      <form>
        <label htmlFor="submitRating">Add a Rating:</label>
        <select
          id="submitRating"
          title="submit a movie rating"
          onChange={this.changeHandler}
        >
          {this.formInputs()}
        </select>
        <button
          onClick={(event) => this.postMovieRating(event)}
          type="submit"
        >
          Submit Rating
        </button>
      </form>
    )
  }

  render() {
    return (
      (this.state.userRating) ? this.userMovieRatingFragment() : this.movieRatingFormFragment()
    )
  }
}

export default MovieRatingForm;
