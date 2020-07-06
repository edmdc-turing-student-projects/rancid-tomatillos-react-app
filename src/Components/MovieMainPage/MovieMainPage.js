import React, { Component } from "react";
import "./MovieMainPage.css";
// import { useRouteMatch } from "react-router-dom";

class MovieMainPage extends Component {
  componentDidMount() {
    const requestUrl = `${this.props.rootUrl}/movies/${this.props.id}`;
    console.log(requestUrl, "url");
    const getMovieDetails = async () => {
      try {
        const response = await fetch(requestUrl);
        console.log(response);
        if (response.ok) {
          const movieDetails = await response.json();
          console.log(movieDetails, "hello world");
          this.setState({ ...movieDetails });
        } else {
          throw new Error({ ...response });
        }
      } catch (error) {
        this.setState({ error: error });
      }
    };
    return getMovieDetails();
  }

  render() {
    return <h5>Hello World</h5>;
  }
}

export default MovieMainPage;
