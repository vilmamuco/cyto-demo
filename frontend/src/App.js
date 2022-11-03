import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import UserInput from "./userInput";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscape from "cytoscape";
import Graph from "./graphComponent";

async function handleNodePosition(node) {
  try {
    const response = await fetch(`/updatePosition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: node.data(), position: node.position() }),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const layout = { name: "cose-bilkent" };
  const [elements, setElements] = useState(() => []);
  // const elementsTest = [
  //   { data: { id: "one", label: "Node 1" }, position: { x: 500, y: 50 } },
  //   { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 50 } },
  //   {
  //     data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
  //   },
  // ];

  // setElements(elementsTest);
  useEffect(() => {
    fetch("/elements")
      .then(
        (res) => res.json(),
        (reason) => {
          console.log("error:", reason);
          return;
        }
      )
      .then((data) => {
        setElements(data);
        console.log(elements);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Coucou!</p>
        <div>
          <div className="left">
            <Graph elements={elements} onPositionChange={handleNodePosition} />
          </div>
          <div className="right">
            <UserInput />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
