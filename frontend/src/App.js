import React, { useState, useEffect } from "react";
import "./App.css";
import UserInput from "./userInput";
import Graph from "./graphComponent";
import LegendComp from "./legendComp";

async function handleNodePosition(node) {
  // function to save the node position after a drag event into the mongoDb
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

async function updateNodeColor(node) {
  // function to save the node position after a drag event into the mongoDb
  try {
    const response = await fetch(`/updateColor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(node),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

async function saveNewElement(data) {
  // function to save the new element(new node and/or the new edge)
  try {
    const response = await fetch(`/saveNewElement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

async function updateElement(data) {
  // function to update the node
  try {
    const response = await fetch(`/updateElement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

async function addNewEdge(data) {
  // function to add a new edge between two nodes
  try {
    const response = await fetch(`/addNewEdge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

async function deleteNodeandEdges(id) {
  // function to delete the node and its corresponding edges
  try {
    const response = await fetch(`/deleteNode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

async function deleteEdge(data) {
  // function to delete the node and its corresponding edges
  try {
    const response = await fetch(`/deleteEdge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

function App() {
  const [elements, setElements] = useState(() => []);
  const [elementIds, setElementIds] = useState(() => []);
  const [targetNodes, setTargetNodes] = useState(() => []);
  const [nodeToMod, setNodeToMod] = useState(() => ({
    id: "",
    label: "",
    backgroundColor: "#ff79c6",
    targetNode: "",
  }));

  const modifyNodeForm = (node) => {
    setNodeToMod(node);
  };

  // const elementsTest = [
  //   {
  //     data: { id: "one", label: "Node 1" },
  //     position: { x: 500, y: 50 },
  //     style: { "background-color": "blue" },
  //   },
  //   { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 50 } },
  //   {
  //     data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
  //   },
  // ];

  //get the elements of the graph
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

  //get the ids of the elements of the graph
  useEffect(() => {
    fetch("/elementIds")
      .then(
        (res) => res.json(),
        (reason) => {
          console.log("error:", reason);
          return;
        }
      )
      .then((data) => {
        setElementIds(data);
        console.log(elementIds);
      });
  }, []);

  // get the list of nodes for the select input for the form to add a new node
  useEffect(() => {
    fetch("/getTargetNodes")
      .then(
        (res) => res.json(),
        (reason) => {
          console.log("error:", reason);
          return;
        }
      )
      .then((data) => {
        setTargetNodes(data);
        console.log(targetNodes);
      });
  }, []);

  // display graph and user input form
  return (
    <div className="App">
      <header className="App-header">
        <p>Coucou!</p>
        <div>
          <LegendComp />
          <div className="left">
            <Graph
              elements={elements}
              elementIds={elementIds}
              onPositionChange={handleNodePosition}
              deleteNodeFunct={deleteNodeandEdges}
              saveNewElement={saveNewElement}
              updateNodeColor={updateNodeColor}
              deleteEdge={deleteEdge}
              modifyNodeForm={modifyNodeForm}
              addNewEdge={addNewEdge}
            />
          </div>
          <div className="right">
            <UserInput
              targetNodes={targetNodes}
              saveNewElement={saveNewElement}
              nodeToMod={nodeToMod}
              updateElement={updateElement}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
