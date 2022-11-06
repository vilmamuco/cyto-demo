# Cytoscape demo application

This demo shows off some basic interaction between Cytoscape, react, flask, and mongodb.

## Overview

The backend folder holds the python server side code and comunicates with the frondend folder with flask (port 5001 - mac already had plans for port 5000). Data is written to mongoDb, which for the sake of this application is expected to run on localhost, on the default port.

The frontend uses react with the official cytoscape component. I wrapped this component in the Graph Component to handle information passage with the main application and the other sibling components.

## How to run

To run the application, three things need to be available:

1. The database server (mongoDb)
2. The backend (flask)
3. The frontend (typically hosted as static files, but we will use the react development server)

### Starting mongoDb

Any way of making mongoDb accessible on localhost:27017 will do.
The easiest and cleanest way is to run `docker compose up` in the repository root.

### Starting backend

Create a virtual environment inside the backend folder and activate it. Then install the necessary requirements:

```terminal
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Now we can use `flask run` to start the backend.

### Starting frontend

We need nodejs and the yarn package manager. Once you have those, run `yarn install` in the frontend folder and then use `yarn start` to start the frontend.

## Limitations and Reflections

There are multiple issues with this project that could be dealt with but are out of scope for this excercise.
First and foremost as this the application with handle only a single user (this could be dealt by identifying users and assigning individual graphs to each of them).

The app does generates many requests but for the moment I don't see a way around it.

## Things to try out:

- Add node through the form
- Modify a node (click on it to select) through the form
  - Change label
  - Change color
  - Add a new edge
- Context menu (right click)
  - Add a new node
  - Add a new edge (click to select a target node)
  - Delete node
  - Delete edge
  - Select a color
- Drag the node to save its position on the graph

## TODO list:

- Add the posibility to relayout the graph
- Add the posibility to have multiple graphs and switch between them in the UI.
  This can be done simply by adding a new id on the tables for the different graphs.
- Modification of the node label direcly though the context menu (open a small field on the side of the node and save on enter)
- Refactoring the backend code (multiple redundand functions)
- Better deployment.
  Using `docker compose` to lanch all three services together
- change style of selected node while adding an edge or editing a node
- un-select a node by clicking into empty canvas space
