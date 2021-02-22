import logo from "./logo.svg";
import "./App.css";
import React from "react";

const App = () => {
  const [showImage, setShowImage] = React.useState(false);

  function toggle() {
    setShowImage(!showImage);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={toggle}>
          {showImage ? "Escoder" : "Mostar"}
        </button>
        {showImage && <img src={logo} className="App-logo" alt="logo" />}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
