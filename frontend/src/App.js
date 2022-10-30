import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import CytoscapeComponent from "react-cytoscapejs";
import userInput from "./userInput";
import UserInput from "./userInput";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 50, y: 50 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 50 } },
    {
      data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
    },
  ];

  useEffect(() => {
    fetch("/time")
      .then(
        (res) => res.json(),
        (reason) => {
          console.log("error:", reason);
          return { time: "FUCK" };
        }
      )
      .then((data) => {
        console.log(data);
        setCurrentTime(data.time);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Coucou!</p>
        <CytoscapeComponent
          elements={elements}
          style={{ width: "1000px", height: "600px", padding: "0px" }}
        />
        <UserInput />
        <p>The current time is {currentTime} .</p>
      </header>
    </div>
  );
}

export default App;
