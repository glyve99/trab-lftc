import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button/Button';

const Canvas = props => {

    const { nodes, updateNodes, transitions } = props;

    const canvasRef = useRef(null);

    const drawNode = (ctx, x, y, id) => {
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, 2 * Math.PI);
        ctx.fillText(`q${id}`, x - 12.5, y);
        ctx.stroke();
    }

    const drawArrow = (ctx, x0, y0, x1, y1, arrowWidth, arrowLength, arrowStart, arrowEnd, value) => {
        const dx = x1 - x0;
        const dy = y1 - y0;
        const angle = Math.atan2(dy,dx);
        const len = Math.sqrt(dx*dx + dy*dy);
        ctx.translate(x0,y0);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(len,0);
        if(arrowStart){
            ctx.moveTo(arrowLength, -arrowWidth);
            ctx.lineTo(0,0);
            ctx.lineTo(arrowLength, arrowWidth);
        }
        if(arrowEnd){
            ctx.moveTo(len - arrowLength, -arrowWidth);
            ctx.lineTo(len, 0);
            ctx.lineTo(len - arrowLength, arrowWidth);
        }
        ctx.fillText(value, (x0 + x1)/2 - 500, (y0 + y1)/2 - 250);
        ctx.stroke();
        ctx.setTransform(1,0,0,1,0,0);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 2000, 2000);
        ctx.fillStyle = '#000000';
        ctx.font = '15px Arial';
        console.log(nodes);
        console.log(transitions);
        nodes.forEach(node => drawNode(ctx, node.x, node.y - 100, node.id));
        transitions.forEach(transition => {
            const { start, finish, value } = transition;
            const node0 = nodes.find(node => node.id === parseInt(start));
            if(start === finish){
                ctx.beginPath();
                ctx.arc(node0.x, node0.y - 125, 25, 0, Math.PI, true);
                ctx.stroke();
            } else {
                const node1 = nodes.find(node => node.id === parseInt(finish));
                drawArrow(ctx, node0.x, node0.y - 100, node1.x, node1.y - 100, 5, 8, false, true, value);
            }
        })
    }, [nodes, transitions]);

    return (
        <canvas
            ref={canvasRef}
            onClick={e => updateNodes({ x: e.clientX, y: e.clientY })}
            height={525}
            width={1365}
            {...props}
        />
    )

}

export default function Test() {

    const [nodes, setNodes] = useState([]);
    const [transitions, setTransitions] = useState([]);
    const [input, setInput] = useState({start: '', finish: '', value: ''});

    const updateNodes = node => {
        if(nodes.length === 0){
            node.id = 0
        } else {
            node.id = nodes[nodes.length - 1].id + 1;
        }
        setNodes([ ...nodes, node ]);
    }

    return (
        <div style={{ height: '100vh' }}>
            <div style={{ height: '15%', backgroundColor: 'purple' }}>
                <input
                    value={input.start}
                    onChange={e => setInput({ ...input, start: e.target.value })}
                />
                <input
                    value={input.finish}
                    onChange={e => setInput({ ...input, finish: e.target.value })}
                />
                <input 
                    value={input.value}
                    onChange={e => setInput({ ...input, value: e.target.value })}
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        setTransitions([ ...transitions, input ]);
                        setInput({start: '', finish: '', value: ''});
                    }}
                >Submit</Button>
            </div>
            <div style={{ height: '85%' }}>
                <Canvas
                    nodes={nodes}
                    updateNodes={updateNodes}
                    transitions={transitions}
                />
            </div>
        </div>
    )
}
