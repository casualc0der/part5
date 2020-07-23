import React from "react";

const Notification = ({ message }) => {
  const errorStyle = {
    backgroundColor: "grey",
    borderStyle: "solid",
    borderColor: "red",
    color: "white",
    fontSize: "large",
  };
  const notificationStyle = {
    backgroundColor: "grey",
    borderStyle: "solid",
    borderColor: "green",
    color: "white",
    fontSize: "large",
  };

  if (message === null) {
    return null;
  }
  const style = message.includes("ERROR") ? errorStyle : notificationStyle;
  return (
    <div style={style} className="error">
      {message}
    </div>
  );
};

export default Notification;
