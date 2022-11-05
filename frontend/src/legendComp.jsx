import React, { Component } from "react";

export default class LegendComp extends React.Component {
  render() {
    return (
      <div className="legendComp">
        <p>
          <h1>User Guided Tour</h1>
        </p>
        <p>
          <ul>
            <li>Add node through the form</li>
            <li>Modify a node (click on it to select) through the form</li>
            <ul>
              <li>Change label </li>
              <li>Change color</li>
              <li>Add a new edge</li>
            </ul>
            <li>Context menu (right click)</li>
            <ul>
              <li>Add a new node </li>
              <li>Delete node</li>
              <li>Delete edge</li>
              <li>Select a color</li>
            </ul>
            <li>Drag the node to save its position on the graph</li>
          </ul>
        </p>
      </div>
    );
  }
}
