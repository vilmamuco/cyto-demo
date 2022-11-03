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

@app.route("/updatePosition", methods=["POST"], strict_slashes=False)
def update_Position():
    id = request.json['data']['id']
    x = request.json['position']['x']
    y = request.json['position']['y']

    nodes.update_one({"data.id": id},
            {"$set": {"position.x": x, "position.y": y}})

    # maybe return just ok 
    return get_elements()


