import React, { Component } from "react";
import "./MovieRatingForm.css";
import { addRating } from "../../apiCalls";

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
    console.log(event.target.value);

    this.setState({ rating:  event.target.value})
  }

 postMovieRating = async () => {
   const movieInfo = {
     movie_id: parseInt(this.state.movieId),
     rating: parseInt(this.state.rating)
   }
    try {
      const response = await addRating(this.state.userId, movieInfo);
      this.setState({userRating: this.state.rating})
      console.log(response);
    } catch(error)  {
      this.setState({ error: error });
    }
  }

  userMovieRatingFragment = () => {
    return (
      <>
        <h5>{`Your Rating: ${this.state.userRating}`}</h5>
        <button> Hello </button>
      </>
    )
  }

  movieRatingFormFragment = () => {
    return (
      <>
        <form onChange={this.changeHandler}>{this.formInputs()}
          <button onClick={(event) => {
            event.preventDefault();
            this.postMovieRating()
          }}>Submit</button>
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
