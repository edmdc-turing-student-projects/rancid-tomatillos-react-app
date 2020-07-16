import React, { Component } from "react";
import PropTypes from "prop-types";
import { addComment } from "../../apiCalls";
import "./CommentForm.css";
import { findComments } from "../../utils";


class CommentForm extends Component {
  constructor({movieId, comments}) {
    super();
    this.state = {
      author: "",
      comment: "",
      movie_id: movieId,
      comments: comments,
      error: ""
    }
  }

  postComment = async () => {
    const commentInfo = {
      author: this.state.author,
      comment: this.state.comment,
      movie_id: this.state.movie_id
    }
    try {
      const response = await addComment(commentInfo);
      this.setState({comments: [...this.state.comments, response]})
    } catch(error) {
      this.setState({error: error})
    }
    this.clearInputs();
  }

  updateCommentFields(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  clearInputs = () => {
    this.setState({ author: "", comment: "" });
  }

  render() {
    return (
    <>
      <form title="comment-form" className="comment-form">
        <label htmlFor="name">Name:</label>
          <input
            name="author"
            type="text"
            placeholder="name"
            required="required"
            value={this.state.author}
            onChange={(event) => this.updateCommentFields(event)}
          />
        <label htmlFor="comment">Comment:</label>
          <textarea
            name="comment"
            rows="3"
            required="required"
            placeholder="comment"
            value={this.state.comment}
            onChange={(event) => this.updateCommentFields(event)}
          />
        <button onClick={(event) => this.postComment(event)} type="button">Submit</button>
      </form>
      {findComments(this.state.comments, this.state.movie_id)}
    </>
    );
  }
}

export default CommentForm;

CommentForm.propTypes = {
  author: PropTypes.string,
  comment: PropTypes.string,
  error: PropTypes.string,
  movie_id: PropTypes.number,
  comments: PropTypes.array,
  findComments: PropTypes.func,
};

