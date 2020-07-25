import React, { useState } from "react";
const Blog = ({ blog, likes, del }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  const hideWhenVisible = { display: blogVisible ? "none" : "" };
  const showWhenVisible = { display: blogVisible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <p>Title: {blog.title}</p>
        <button onClick={() => setBlogVisible(true)}>Show details</button>
      </div>
      <div style={showWhenVisible}>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>
          Likes: {blog.likes}
          <button onClick={() => likes(blog)}>like</button>
        </p>
        <p>
          <button onClick={() => del(blog)}>Delete</button>
        </p>
        <button onClick={() => setBlogVisible(false)}>Hide</button>
      </div>
    </div>
  );
};

export default Blog;
