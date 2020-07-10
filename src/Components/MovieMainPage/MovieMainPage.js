import React, { Component } from "react";
import "./MovieMainPage.css";
// import { useRouteMatch } from "react-router-dom";

class MovieMainPage extends Component {
  componentDidMount() {
    const requestUrl = `${this.props.rootUrl}/movies/${this.props.id}`;
    const getMovieDetails = async () => {
      try {
        const response = await fetch(requestUrl);
        if (response.ok) {
          const movieDetails = await response.json();
          this.setState({ ...movieDetails });
        } else {
          throw new Error({ ...response });
        }
      } catch (error) {
        this.setState({ ...error });
      }
    };
    return getMovieDetails();
  }

  render() {
    return (
      <section>
        {this.state && (
          <>
            <h1>{this.state.movie.title}</h1>
            <figure>
              <img
                className="poop"
                src={this.state.movie.backdrop_path}
                alt={`Backdrop for ${this.state.movie.title}`}
              />
              <figcaption>
                <h4>Title: {this.state.movie.title}</h4>
                <p>Tagline: {this.state.movie.tagline}</p>
                <p>Overview: {this.state.movie.overview}</p>
                <p>Release Data: {this.state.movie.release_date}</p>
                <p>Genre(s): {(this.state.movie.genres).join(', ')}</p>
                <p>Budget: ${(this.state.movie.budget).toLocaleString('en')}</p>
                <p>Revenue: ${(this.state.movie.revenue).toLocaleString('en')}</p>
                <p>Average Rating: {Math.round(this.state.movie.average_rating)}</p>
                <p>Runtime: {this.state.movie.average_rating} Minutes</p>
              </figcaption>
            </figure>
          </>
        )}
      </section>
    );
  }
}

export default MovieMainPage;
