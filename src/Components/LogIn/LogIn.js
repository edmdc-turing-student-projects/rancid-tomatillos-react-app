import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

import "./LogIn.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: false,
    };
  }

  updateLoginFields(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  loginUser = async () => {
    const userInfo = await this.props.postUser(this.state)

    if(userInfo !== 'Incorrect Email/Password') {
      this.setState({redirect: true})
    } else {
      alert('Incorrect Email/Password')
      this.setState({error: userInfo})
    }
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }
    return (
      <form className="login-form" title="Login Form">
        <label htmlFor="email">Email:</label>
        <input
          className="login-input"
          name="email"
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={(event) => this.updateLoginFields(event)}
        />
        <label htmlFor="password">Password:</label>
        <input
          className="login-input"
          name="password"
          type="text"
          placeholder="password"
          value={this.state.password}
          onChange={(event) => this.updateLoginFields(event)}
        />
        <button onClick={(event) => this.loginUser(event)} className="submit-button" type="button">Submit</button>
      </form>
    );
  }
}
export default LogIn;

LogIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

