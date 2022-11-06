import React, { Component } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import contextMenus from "cytoscape-context-menus";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import cytoscape from "cytoscape";
import { v4 as uuidv4 } from "uuid";

// icons taken from https://uxwing.com/

cytoscape.use(contextMenus);
export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodeId: "",
    };
  }

  render() {
    const layout = {
      name: "cose",
    };

    const cytoscapeStylesheet = [
      {
        selector: "node",
        style: {
          label: "data(label)", // here you can label the nodes
        },
      },
      {
        selector: "node[label]",
        style: {
          color: "white",
        },
      },
      {
        selector: "edge",
        style: {
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
          width: 1.5,
        },
      },
    ];

    return (
      <CytoscapeComponent
        elements={this.props.elements}
        stylesheet={cytoscapeStylesheet}
        style={{
          width: "800px",
          height: "500px",
          border: "1px solid black",
        }}
        cy={(cy) => {
          this.cy = cy;
        }}
        layout={layout}
      />
    );
  }

  componentDidMount() {
    this.cy
      .layout({
        name: "cose",
      })
      .run();

    this.cy.on("dragfree", "node", (e) => {
      //save position of node on database after dragging
      var node = e.target;
      this.props.onPositionChange(node);
      console.warn(node.position());
    });

    this.cy.on("click", "node", (e) => {
      if (this.state.selectedNodeId != "") {
        //add a new edge
        var data = {
          target: e.target.data("id"),
          source: this.state.selectedNodeId,
        };
        this.props.addNewEdge(data);
        var targetnode = this.cy.$("#" + this.state.selectedNodeId);
        if (targetnode.edgesTo(e.target).length == 0) {
          e.cy.add({
            data: data,
          });
        }
        this.setState({
          selectedNodeId: "",
        });
      } else {
        //click on node to modify
        var data = {
          id: e.target.data("id"),
          label: e.target.data("label"),
          backgroundColor: e.target.style("background-color"),
        };
        this.props.modifyNodeForm(data);
      }
    });

    var contextMenu = this.cy.contextMenus({
      menuItems: [
        {
          id: "delete",
          content: " Delete",
          tooltipText: "delete",
          image: {
            src: require("./images/danger-icon.svg").default,
            width: 20,
            height: 20,
            x: 0,
            y: 4,
          },
          selector: "node",
          onClickFunction: (event) => {
            var target = event.target || event.cyTarget;
            target.remove();
            this.props.deleteNodeFunct(target.data("id"));
          },
          hasTrailingDivider: true,
        },
        {
          id: "deleteEdge",
          content: " Delete",
          tooltipText: "delete",
          image: {
            src: require("./images/danger-icon.svg").default,
            width: 20,
            height: 20,
            x: 0,
            y: 4,
          },
          selector: "edge",
          onClickFunction: (event) => {
            var target = event.target || event.cyTarget;
            target.remove();
            var dataInput = {
              source: target.data("source"),
              target: target.data("target"),
            };
            this.props.deleteEdge(dataInput);
          },
          hasTrailingDivider: true,
        },
        {
          id: "addNodeEdge",
          content: " Add new edge (Click to select target)",
          tooltipText: "Click a node to select it as a target node",
          image: {
            src: require("./images/cluster-data-icon.svg").default,
            width: 20,
            height: 20,
            x: 0,
            y: 4,
          },
          selector: "node",
          onClickFunction: (event) => {
            var target = event.target || event.cyTarget;
            this.setState({
              selectedNodeId: target.data("id"),
            });
          },
        },
        {
          id: "addNode",
          content: " Add node",
          tooltipText: "Add node",
          image: {
            src: require("./images/math-plus-icon.svg").default,
            width: 20,
            height: 20,
            x: 0,
            y: 4,
          },
          selector: "node, edge",
          coreAsWell: true,
          onClickFunction: (event) => {
            var nodeId = uuidv4();
            var nodeLabel = "Label";
            var pos = event.position || event.cyPosition;
            event.cy.add({
              data: {
                id: nodeId,
                label: nodeLabel,
              },
              position: {
                x: pos.x,
                y: pos.y,
              },
              style: { "background-color": "#ff79c6", color: "white" },
            });
            var dataInput = {
              id: nodeId,
              label: nodeLabel,
              x: pos.x,
              y: pos.y,
              backgroundColor: "#ff79c6",
            };
            this.props.saveNewElement(dataInput);
          },
        },
        // add color submenu
        // adapted from https://github.com/iVis-at-Bilkent/cytoscape.js-context-menus/blob/97877acfa77914ee01c4c74c12b0e1ccc362852d/demo.html
        {
          id: "color",
          content: " Change color",
          tooltipText: "Change color",
          selector: "node",
          image: {
            src: require("./images/paint-brush-drawing-icon.svg").default,
            width: 20,
            height: 20,
            x: 0,
            y: 4,
          },
          hasTrailingDivider: true,
          submenu: [
            {
              id: "color-blue",
              content: "blue",
              tooltipText: "blue",
              onClickFunction: (e) => {
                let target = e.target || e.cyTarget;
                target.style("background-color", "blue");
                var data = {
                  id: target.data("id"),
                  backgroundColor: target.style("background-color"),
                };
                this.props.updateNodeColor(data);
              },
              submenu: [
                {
                  id: "color-light-blue",
                  content: "light blue",
                  tooltipText: "light blue",
                  onClickFunction: (event) => {
                    let target = event.target || event.cyTarget;
                    target.style("background-color", "lightblue");
                    var data = {
                      id: target.data("id"),
                      backgroundColor: target.style("background-color"),
                    };
                    this.props.updateNodeColor(data);
                  },
                },
                {
                  id: "color-dark-blue",
                  content: "dark blue",
                  tooltipText: "dark blue",
                  onClickFunction: (event) => {
                    let target = event.target || event.cyTarget;
                    target.style("background-color", "#0066cc");
                    var data = {
                      id: target.data("id"),
                      backgroundColor: target.style("background-color"),
                    };
                    this.props.updateNodeColor(data);
                  },
                },
              ],
            },
            {
              id: "color-green",
              content: "green",
              tooltipText: "green",
              onClickFunction: (event) => {
                let target = event.target || event.cyTarget;
                target.style("background-color", "green");
                var data = {
                  id: target.data("id"),
                  backgroundColor: target.style("background-color"),
                };
                this.props.updateNodeColor(data);
              },
            },
            {
              id: "color-red",
              content: "red",
              tooltipText: "red",
              onClickFunction: (event) => {
                let target = event.target || event.cyTarget;
                target.style("background-color", "red");
                var data = {
                  id: target.data("id"),
                  backgroundColor: target.style("background-color"),
                };
                this.props.updateNodeColor(data);
              },
            },
          ],
        },
      ],
      menuItemClasses: ["contextMenu"],
      contextMenuClasses: ["contextMenu"],
      submenuIndicator: {
        src: require("./images/hamburger-menu-icon.svg").default,
        width: 14,
        height: 14,
      },
    });
  }
}
