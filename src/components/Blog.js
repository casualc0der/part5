import React, { useState } from "react";

const Blog = ({ blog, likes, del, user }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  const hideWhenVisible = { display: blogVisible ? "none" : "" };
  const showWhenVisible = { display: blogVisible ? "" : "none" };
  const blogUserID = blog.user.id ? blog.user.id : blog.user;
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
        <p>blogUID: {blog.user.username}</p>
        <p>UID: {user.username}</p>
        <p>
          Likes: {blog.likes}
          <button onClick={() => likes(blog)}>like</button>
        </p>
        <p>
          {user.id === blogUserID && (
            <button onClick={() => del(blog)}>Delete</button>
          )}
        </p>
        <button onClick={() => setBlogVisible(false)}>Hide</button>
      </div>
    </div>
  );
};

export default Blog;
