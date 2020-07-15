import React, { Component } from "react";
import "./MovieMainPage.css";
import CommentForm from "../CommentForm/CommentForm.js";
import { getSingleMovieInfo } from "../../apiCalls";
import { formatDate, findMovieRating } from "../../utils";


class MovieMainPage extends Component {
  componentDidMount() {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await getSingleMovieInfo(this.props.id);
        this.setState({ ...movieDetails });
      } catch (error) {
        this.setState({ ...error });
      }
    };
    getMovieDetails();
  }

  findComments() {
    const comments = this.props.comments.filter(comment => comment.movie_id === this.state.movie.id)

    return comments.map(comment => {
      return (
        <section className="comments">
          <p>{comment.comment}</p>
          <p className="author">User: <i>{comment.author}</i></p>
        </section>
      );
    })
  }

  render() {
    return (
      <section id="single-movie">
        {this.state && (
          <section>
            <figure id="figure-container">
              <img
                className="movie-image"
                src={this.state.movie.backdrop_path}
                alt={`Backdrop for ${this.state.movie.title}`}
              />
              <section className="movie-info">
                <h3>{this.state.movie.title}</h3>
                <h4 className="tagline">{this.state.movie.tagline}</h4>
                <p><strong>Overview:</strong> <br></br> {this.state.movie.overview}</p>
                <p><strong>Release Data:</strong> <br></br> {formatDate(this.state.movie.release_date)}</p>
                <p><strong>Genre(s):</strong> <br></br> {(this.state.movie.genres).join(', ')}</p>
                <p><strong>Budget:</strong> <br></br> ${(this.state.movie.budget).toLocaleString('en')}</p>
                <p><strong>Revenue:</strong> <br></br> ${(this.state.movie.revenue).toLocaleString('en')}</p>
                <p><strong>Runtime:</strong> <br></br> {this.state.movie.runtime} Minutes</p>
                <p><strong>Average Rating:</strong> <br></br> {Math.round(this.state.movie.average_rating)}</p>
              </section>
            </figure>
            <section className="other-info">
              <section className="userReview">
              {(this.props.ratings) ? findMovieRating(this.props.ratings, this.state.movie,this.props.userId) : null}
              </section>
              {this.props.userId && <CommentForm movieId={this.state.movie.id} comments={this.props.comments}/>}
              {this.findComments()}
            </section>
          </section>
        )}
      </section>
    );
  }
}

export default MovieMainPage;
