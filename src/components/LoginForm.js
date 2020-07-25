import React, { useState } from "react";
const LoginForm = ({ login }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    login({ username, password });
    setUserName("");
    setPassword("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </div>
    </form>
  );
};

export default LoginForm;
