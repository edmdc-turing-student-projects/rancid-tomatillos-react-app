import React, { Component } from "react";
import "./MovieMainPage.css";

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
      <section id="single-movie">
        {this.state && (
          <section>
            <figure id="bg">
              <img
                className="poop"
                src={this.state.movie.backdrop_path}
                alt={`Backdrop for ${this.state.movie.title}`}
              />
              <section className="test">
                <h3>{this.state.movie.title}</h3>
                <h4 className="tagline">{this.state.movie.tagline}</h4>
                <p><strong>Overview:</strong> <br></br> {this.state.movie.overview}</p>
                <p><strong>Release Data:</strong> <br></br> {this.state.movie.release_date}</p>
                <p><strong>Genre(s):</strong> <br></br> {(this.state.movie.genres).join(', ')}</p>
                <p><strong>Budget</strong>: <br></br> ${(this.state.movie.budget).toLocaleString('en')}</p>
                <p><strong>Revenue:</strong> <br></br> ${(this.state.movie.revenue).toLocaleString('en')}</p>
                <p><strong>Average Rating:</strong> <br></br> {Math.round(this.state.movie.average_rating)}</p>
                <p><strong>Runtime:</strong> <br></br> {this.state.movie.average_rating} Minutes</p>
              </section>
            </figure>
          </section>
        )}
      </section>
    );
  }
}

export default MovieMainPage;
