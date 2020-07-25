import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong username/password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      console.log(returnedBlog);

      blogFormRef.current.toggleVisibility();
      const newBlogs = [...blogs];
      setBlogs(newBlogs.concat(returnedBlog));
      setErrorMessage(
        `${blogObject.title} by ${blogObject.author} was added to the list!`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage(
        "ERROR: Please fill in all fields (min length is 3 characters)"
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };
  const updateLikes = async (blogObject) => {
    const newObject = { ...blogObject };
    newObject.likes++;
    blogService.update(blogObject.id, newObject);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const sortBlogs = () => {
    const blogsCopy = [...blogs];
    const sortedBlogs = blogsCopy.sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
    blogs.map((x) => x);
  };
  const deleteBlog = async (blogObject) => {
    const result = window.confirm(`Really delete ${blogObject.title}?`);
    if (result) {
      await blogService.remove(blogObject.id);
      const blogCopy = [...blogs];
      const updatedBlogs = blogCopy.filter((blog) => blog.id !== blogObject.id);
      setBlogs(updatedBlogs);
    }
  };
  const blogFormRef = useRef();
  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm login={handleLogin} />
      ) : (
        <div>
          {" "}
          <p>{user.name} is logged in</p>
          <button onClick={handleLogOut}>Logout</button>
          <Togglable buttonLabel={"Submit new blog"} ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>blogs</h2>
          <button onClick={() => sortBlogs()}>Most Popular</button>
          {blogs.map((blog) => (
            <Blog
              user={user}
              del={deleteBlog}
              likes={updateLikes}
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
