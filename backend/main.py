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

@app.route('/elementIds')
def get_elementIds():
    elementIds = []
    elementIds += [ node['data']['id'] for node in nodes.find({}, {"_id":0})]
    return jsonify(elementIds)

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
    request_data = request.get_json()
    id = request.json['id']
    label = request.json['label']
    target = None 
    x = 0
    y = 0

    if 'target' in request_data:
        target = request.json['target']
    if 'x' in request_data:
        x = request.json['x']
    if 'y' in request_data:
        y = request.json['y']
    if (nodes.find() is not None )or nodes.find({'data.id': { "$in": id}}).count() > 0:
        nodes.insert_one({"data": {'id': id, 'label':label}, 'position': {'x':x, 'y':y}});
        if target:
            edges.insert_one({'data':{'source':id, 'target': target, 'label':'test add'}});
    return get_elements()

@app.route('/deleteNode', methods=['POST'], strict_slashes=False)
def delete_node():
    #deletes the node and the edges connected to it 
    id = request.json['id']
    if (nodes.find() is not None )or nodes.find({'data.id': id}).count() > 0:
        nodes.delete_one({'data.id':  id});
        edges.delete_many({'$or': [{'data.target': id}, {'data.source': id}]});
    return get_elements()
