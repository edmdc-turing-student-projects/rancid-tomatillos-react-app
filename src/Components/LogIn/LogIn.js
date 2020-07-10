import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

  loginUser = async (event) => {
    const test2 = await this.props.postUser(this.state);    
    if (test2 === true) {
      console.log(true,'inside true')
      // this.props.postUser(this.state);
    } else {
      event.preventDefault();
      console.log('help');
      
    }
    // return this.props.postUser(this.state);
  }

  render() {
      return (
        <form className="login-form">
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
            <Link to="/">
              <button onClick={(event) => this.loginUser(event)} className="submit-button">Submit</button>
            </Link>
        </form>
      );
  }
}
export default LogIn;

LogIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

