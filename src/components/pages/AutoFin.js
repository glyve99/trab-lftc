import React, { useState, useEffect } from 'react';
import Node from '../../components/Node';
import { ArcherContainer, ArcherElement } from 'react-archer';

export default function AutoFin() {

    const [nodes, setNodes] = useState([]);

    const updateNodes = e => {
        let flag = true;
        for(const node of nodes){
            if(e.clientX < node.rightLim && e.clientX > node.leftLim && e.clientY > node.upperLim && e.clientY < node.bottomLim){
                flag = false;
            }
        }
        if(flag){
            const node = {
                x: e.clientX,
                y: e.clientY,
                rightLim: e.clientX + 25,
                leftLim: e.clientX - 25,
                upperLim: e.clientY - 25,
                bottomLim: e.clientY + 25
            };
            setNodes([ ...nodes, node ]);
            console.log(nodes.length);
        }
    }

    const updateNodeCallback = (index, x, y) => {
        const updatedNode = {
            x,
            y,
            rightLim: x + 25,
            leftLim: x - 25,
            upperLim: y - 25,
            bottomLim: y + 25
        };
        console.log(updatedNode);
        const newArr = nodes.map((node, i) => i === index ? updatedNode : node);
        console.log(newArr);
        setNodes(newArr);
    } 

    const keyDownHandler = e => {
        if(e.keyCode === 67) setNodes([]);
    }

    useEffect(() => {
        window.addEventListener("click", updateNodes);
        window.addEventListener("keydown", keyDownHandler);
        return () => {
            window.removeEventListener("click", updateNodes);
            window.removeEventListener("keydown", keyDownHandler);
        }
    }, [nodes]);

    return (
        <div style={{height: '100vh', width: '100%'}}>
            <ArcherContainer strokeColor='red'>
                {nodes.map((node, i) => (
                <Node key={i} index={i} x={node.x} y={node.y} update={updateNodeCallback} />
                ))}
            </ArcherContainer>
        </div>
    )

    //return (
    //    <div style={{ height: '100vh', width: '100%' }}>
    //        <ArcherContainer strokeColor='red'>
    //            <ArcherElement
    //                id='q0'
    //                relations={[
    //                    {
    //                        targetId: 'q0',
    //                        targetAnchor: 'left',
    //                        sourceAnchor: 'right',
    //                        style: { strokeDasharray: '5,5' }
    //                    }
    //                ]}
    //            >
    //                <div>
    //                    oi
    //                </div>
    //            </ArcherElement>
    //            <ArcherElement
    //                id='q1'
    //                relations={[
    //                    {
    //                        targetId: 'q0',
    //                        targetAnchor: 'right',
    //                        sourceAnchor: 'left',
    //                        style: { strokeDasharray: '5,5' }
    //                    }
    //                ]}
    //            >
    //                <div>
    //                    salve
    //                </div>
    //            </ArcherElement>
    //        </ArcherContainer>
    //    </div>
    //)

}
