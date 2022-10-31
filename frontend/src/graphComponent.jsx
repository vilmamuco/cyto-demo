import React, { Component } from 'react';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';

export default class Graph extends Component {
  render() {

    const layout = {
        name: 'cose'
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
}