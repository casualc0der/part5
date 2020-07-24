import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    createBlog({ title: blogTitle, author: blogAuthor, url: blogUrl });
    setBlogAuthor("");
    setBlogTitle("");
    setBlogUrl("");
  };
  return (
    <>
      <h1>Create New</h1>
      <form onSubmit={handleBlogSubmit}>
        <div>
          Title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={blogUrl}
            name="URL"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default BlogForm;
