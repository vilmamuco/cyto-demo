import React, { Component } from "react";
import { BlockPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv4(),
      label: "",
      targetNode: "",
      backgroundColor: "#ff79c6",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // check to prevent unnecessary render
    if (nextProps.nodeToMod["id"] != this.state.id) {
      this.setState({
        id: uuidv4(),
        label: nextProps.nodeToMod["label"],
        backgroundColor: nextProps.nodeToMod["backgroundColor"],
        targetNode: nextProps.nodeToMod["targetNode"],
      });
    }
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleColorChange(color) {
    this.setState({
      backgroundColor: color.hex,
    });
  }

  handleSubmit(event) {
    if (this.state.id == "" || this.state.label == "") {
      alert("Please fill in the Node Label to continue.");
      return;
    }
    var data = {
      id: this.state.id,
      label: this.state.label,
      target: this.state.targetNode,
      backgroundColor: this.state.backgroundColor,
    };
    if (this.props.nodeToMod["id"].length > 0) {
      this.props.updateElement(data);
    } else {
      this.props.saveNewElement(data);
    }
    //event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.nodeToMod["id"].length > 0 ? (
          <label>Modify node</label>
        ) : (
          <label>Add a new Node</label>
        )}
        <br />
        <br />
        <label>
          <input
            type="hidden"
            name="id"
            value={this.state.id}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Node label:
          <input
            type="text"
            name="label"
            value={this.state.label}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Node color:
          <BlockPicker
            triangle="hide"
            colors={[
              "#ff79c6",
              "#8be9fd",
              "#50fa7b",
              "#ffb86c",
              "#bd93f9",
              "#ff5555",
              "#f1fa8c",
              "#ff8a65",
              "#ba68c8",
            ]}
            color={this.state.backgroundColor}
            onChange={this.handleColorChange}
          />
        </label>
        <label>
          Select a target Node:
          <select
            name="targetNode"
            value={this.state.targetNode}
            onChange={this.handleChange}
          >
            <option value="">Select a target node</option>
            {this.props.targetNodes.map(({ id, label }, index) => (
              <option value={id} key={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit"> Submit</button>
      </form>
    );
  }
}

export default UserInput;
