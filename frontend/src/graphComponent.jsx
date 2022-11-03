import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

export default class Graph extends Component {
  render() {

    const layout = {
        name: 'circle'
    };
    
    return(
        <CytoscapeComponent
            elements={this.props.elements}
            style={{
                width: "800px",
                height: "500px",
                border: "1px solid black"
            }}
            cy={(cy) => {
              this.cy = cy
            }}
            layout={layout}
        />
    );
  }
 
  componentDidMount() {
    this.cy.layout({
      name: 'cose'
    }).run();

    this.cy.on('dragfree', 'node', (e) => {
      var node = e.target;
      this.props.onPositionChange(node);
      console.warn(node.position());
    });
  }
}