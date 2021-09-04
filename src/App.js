import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import "./App.css";

const socket = io.connect("http://localhost:9009");

function App() {
  const [state, setState] = useState({ name: "", message: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("getData", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  //onTextChage
  const onTextChage = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //onMessageSubmit
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ name, message: "" });
  };

  //func renderChat
  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChage(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChage(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
