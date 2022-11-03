import React, { Component } from 'react';
class UserInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {id: '', 
                    label: '', 
                    targetNode: ''
                    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(event) {
      if (this.state.id == "" || this.state.label == ""){
        alert("Please fill in the Node Id and the Label to continue.");
        return;
      }
      var data = {"id": this.state.id, "label": this.state.label, "target": this.state.targetNode};
      this.props.saveNewElement(data);
      //event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>Add a new Node</label>
          <br/><br/>
          <label>Node Id:
            <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
          </label>
          <label>Node label:
            <input type="text" name="label" value={this.state.label} onChange={this.handleChange} />
          </label>
          <label>
            Select a target Node: 
            <select name="targetNode" value={this.state.target} onChange={this.handleChange} >
              <option value='' selected >Select a target node</option>
              {this.props.targetNodes.map(({ id, label }, index) => <option value={id}  key={id} >{label}</option>)}
            </select>
          </label>
          <button type="submit"> Submit</button>
        </form>
      );
    }
  }
  
  export default UserInput;