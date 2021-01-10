import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button/Button';
import Graph from 'react-graph-vis';

export default function Test2() {

    const [nodes, setNodes] = useState([
        { id: 1, label: "Node 1"},
        { id: 2, label: "Node 2"},
        { id: 3, label: "Node 3"},
    ]);
    const [edges, setEdges] = useState([
        { from: 1, to: 2 },
        { from: 1, to: 3 },
    ]);

    useEffect(() => {
        
    }, [nodes, edges]);

    const options = {
        layout: {
          hierarchical: false
        },
        edges: {
          color: "#000000"
        },
        height: "500px"
    };

    const events = {
        select: function(event) {
          var { nodes, edges } = event;
        }
    };

    return (
        <div style={{ height: '100vh' }}>
            <div style={{ height: '15%', backgroundColor: 'purple' }}>
                <Button onClick={() => setNodes([ ...nodes, { id: nodes[nodes.length-1].id+1, label: 'Node' } ])}>Add node</Button>
            </div>
            <div style={{ height: '85%' }}>
                <Graph
                    graph={{
                        nodes: nodes,
                        edges: edges
                    }}
                    options={options}
                    events={events}
                />
            </div>
        </div>
    )
}

