import time
from flask import Flask, jsonify, request
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["cytoDb"]
nodes = mydb["nodes"]
edges = mydb["edges"]

app = Flask(__name__)

@app.route('/nodes')
def get_nodes():
    return list(nodes.find({}, {"_id":0}))

@app.route('/edges')
def get_edges():
    return list(edges.find({}, {"_id":0}))

@app.route('/elements')
def get_elements():
    elements = []
    elements += [node for node in nodes.find({}, {"_id":0})]
    elements += [node for node in edges.find({}, {"_id":0})]
    return jsonify(elements)

@app.route('/getTargetNodes')
def get_targetNodes():
    # send the target nodes for the select input for the user form
    return jsonify([{'id': node['data']['id'], 'label': node['data']['label'] } for node in get_nodes()])


@app.route('/updatePosition', methods=['POST'], strict_slashes=False)
def update_Position():
    #saves the current position of the node in the database
    id = request.json['data']['id']
    x = request.json['position']['x']
    y = request.json['position']['y']

    nodes.update_one({"data.id": id},
            {"$set": {"position.x": x, "position.y": y}})
    # maybe return just ok 
    return get_elements()

@app.route('/saveNewElement', methods=['POST'], strict_slashes=False)
def save_newElement():
    #saves the new element int the corresponding tables in the database (nodes, edges)
    id = request.json['id']
    label = request.json['label']
    target = request.json['target']
    if nodes.find({'data.id': { "$in": id}}).count() > 0:
        nodes.insert_one({"data": {'id': id, 'label':label}, 'position': {'x':0, 'y':0}});
        print('test' + target);
        if target:
            edges.insert_one({'data':{'source':id, 'target': target, 'label':'test add'}});
    # this might become a problem when the graph is big 
    return get_elements()

