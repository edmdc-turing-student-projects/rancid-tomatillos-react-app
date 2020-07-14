import React from "react";
import "./Comments.css";

const Comments = ({ author, comment }) => {
  return (
    <article>
      <p>{author}</p>
      <p>{comment}</p>
    </article>
  );
};

export default Comments;