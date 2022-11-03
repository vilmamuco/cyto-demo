import React, { Component } from 'react';
class UserInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {id: '', 
                    label: '', 
                    target: ''
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
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
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
            <select name="target">
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
          <button type="submit"> Submit</button>
        </form>
      );
    }
  }
  
  export default UserInput;