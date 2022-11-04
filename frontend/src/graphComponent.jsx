import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import contextMenus from 'cytoscape-context-menus';
import 'cytoscape-context-menus/cytoscape-context-menus.css';
import cytoscape from 'cytoscape';

// icons taken from https://uxwing.com/

cytoscape.use(contextMenus);
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

  componentDidUpdate(){
    this.cy.on('style', 'node', (e) => {  
      //test if we are adding a new node or we are just rendering
      var data = {"id": e.target.data('id'), 'backgroundColor': e.target.style('background-color')};
      this.props.updateNodeColor(data);
    })
  }
 
  componentDidMount() {
    this.cy.layout({
      name: 'cose'
    }).run();

    this.cy.on('dragfree', 'node', (e) => {
      //save position of node on database after dragging 
      var node = e.target;
      this.props.onPositionChange(node);
      console.warn(node.position());
    });

    this.cy.on('add', 'node', (e) => {  
      //test if we are adding a new node or we are just rendering
      if (!this.props.elementIds.includes(e.target.data('id'))){
        var data = {"id": e.target.data('id'), "label": e.target.data('label'), "x": e.target.position('x'), 'y': e.target.position('y')};
        this.props.saveNewElement(data);
      }
    })

    this.cy.on('remove', 'node', (e) => {
      this.props.deleteNodeFunct(e.target.data('id'));
    })

     var contextMenu = this.cy.contextMenus({
      menuItems: [
        {
          id: 'delete',
          content: ' Delete',
          tooltipText: 'delete',
          image: {src: require("./images/danger-icon.svg").default, width: 20, height: 20, x: 0, y: 4},
          selector: 'node',
          onClickFunction: function (event) {
            var target = event.target || event.cyTarget;
            target.remove();
          },
          hasTrailingDivider: true
        },
        {
          id: 'addNode',
          content: ' Add node',
          tooltipText: 'Add node',
          image: {src: require('./images/math-plus-icon.svg').default, width: 20, height: 20, x: 0, y: 4},
          selector: 'node, edge',
          coreAsWell: true,
          onClickFunction: function (event) {
            var data = {
              id: 'test',
              label: 'test node'
            };
            var pos = event.position || event.cyPosition;
            event.cy.add({
              data: data,
              position: {
                x: pos.x,
                y: pos.y
              }
            });
          }
        },
        // add color submenu
        // adapted from https://github.com/iVis-at-Bilkent/cytoscape.js-context-menus/blob/97877acfa77914ee01c4c74c12b0e1ccc362852d/demo.html
        {
          id: 'color',
          content: ' Change color',
          tooltipText: 'Change color',
          selector: 'node',
          image: {src: require("./images/paint-brush-drawing-icon.svg").default, width: 20, height: 20, x: 0, y: 4},
          hasTrailingDivider: true,
          submenu: [
            {
              id: 'color-blue',
              content: 'blue',
              tooltipText: 'blue',
              onClickFunction: function (event) {
                let target = event.target || event.cyTarget;
                target.style('background-color', 'blue');
              },
              submenu: [
                {
                  id: 'color-light-blue',
                  content: 'light blue',
                  tooltipText: 'light blue',
                  onClickFunction: function (event) {
                    let target = event.target || event.cyTarget;
                    target.style('background-color', 'lightblue');
                  },
                },
                {
                  id: 'color-dark-blue',
                  content: 'dark blue',
                  tooltipText: 'dark blue',
                  onClickFunction: function (event) {
                    let target = event.target || event.cyTarget;
                    target.style('background-color', 'darkblue');
                  },
                },
              ],
            },
            {
              id: 'color-green',
              content: 'green',
              tooltipText: 'green',
              onClickFunction: function (event) {
                let target = event.target || event.cyTarget;
                target.style('background-color', 'green');
              },
            },
            {
              id: 'color-red',
              content: 'red',
              tooltipText: 'red',
              onClickFunction: function (event) {
                let target = event.target || event.cyTarget;
                target.style('background-color', 'red');
              },
            },
          ]
        }
      ],
      menuItemClasses: ["contextMenu"],
      contextMenuClasses: ["contextMenu"], 
      submenuIndicator: { src: require('./images/hamburger-menu-icon.svg').default, width: 14, height: 14 }
    });
  }
}