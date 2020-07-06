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
                <h4>{this.state.movie.overview}</h4>
              </figcaption>
            </figure>
          </>
        )}
      </section>
    );
  }
}

export default MovieMainPage;
