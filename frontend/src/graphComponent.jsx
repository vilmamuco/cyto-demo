import React, { Component } from 'react';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import COSEBilkent from 'cytoscape-cose-bilkent';

Cytoscape.use( COSEBilkent );

export default class Graph extends Component {

  state = {
    w: "1000px",
    h: "600px",

    elements: [],
    allBooks: [],
    allAuthors: [],
  }
//   componentDidMount = () => {
//     this.setState({
//       w: window.innerWidth/2,
//       h:window.innerHeight/2
//     })
//   }
  render() {

    const layout = {
        name: 'cose',
        ready: function(){},
        stop: function(){},
        animate: true,
        animationEasing: undefined,
        animationDuration: undefined,
        animateFilter: function ( node, i ){ return true; },
        animationThreshold: 250,
        refresh: 20,
        fit: true,
        padding: 30,
        boundingBox: undefined,
        nodeDimensionsIncludeLabels: false,
        randomize: false,
        componentSpacing: 40,
        nodeRepulsion: function( node ){ return 2048; },
        nodeOverlap: 4,
        edgeElasticity: function( edge ){ return 32; },
        nestingFactor: 1.2,
        gravity: 1,
        numIter: 1000,
        initialTemp: 1000,
        coolingFactor: 0.99,
        minTemp: 1.0
    };

    return(
        <CytoscapeComponent
            elements={this.state.elements}
            style={{
                width: "800px",
                height: "500px",
                border: "1px solid black"
            }}
            cy={(cy) => {this.cy = cy}}
            layout={layout}
        />
    );
  }
}