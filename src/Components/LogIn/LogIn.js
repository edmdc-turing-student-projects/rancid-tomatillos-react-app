import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, BrowserRouter } from "react-router-dom";
import "./LogIn.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  updateLoginFields(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  loginUser(event) {
    // event.preventDefault();
    this.props.postUser(this.state);
  }

  render() {
    return (
      <form>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={(event) => this.updateLoginFields(event)}
        />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="text"
          placeholder="password"
          value={this.state.password}
          onChange={(event) => this.updateLoginFields(event)}
        />
        {/* <BrowserRouter> */}
        <Link to="/">
          <button onClick={(event) => this.loginUser(event)}>Log In!</button>
        </Link>
        {/* </BrowserRouter> */}
      </form>
    );
  }
}
export default LogIn;

LogIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

