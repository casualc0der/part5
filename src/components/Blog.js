import React from "react";
import Togglable from "../components/Togglable";
const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "green",
  };
  return (
    <div style={blogStyle}>
      Title: {blog.title}
      {/* <Togglable buttonLabel={"view"}> */}
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>
        Likes: {blog.likes}
        <button>like</button>
      </p>
      {/* </Togglable> */}
    </div>
  );
};

export default Blog;
