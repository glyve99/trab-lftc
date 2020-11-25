import React, { useState } from 'react';
import { ArcherElement } from 'react-archer';

export default function Node(props) {

    const { index, x, y, update } = props;

    const [coords, setCoords] = useState({x,y});

    const onDrop = e => {
        const x = e.clientX;
        const y = e.clientY;
        const newCoords = { x, y };
        setCoords(newCoords);
        update(index, x, y);
    }

    const styles = {
        node: {
            position: 'absolute',
            left: coords.x-25,
            top: coords.y-25,
            backgroundColor: 'yellow',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            borderColor: 'black',
            borderWidth: '50px',
            display: 'flex',
            justifyContent: 'center',
        }
    }

    return (
        <ArcherElement
            id={index}
            relations={[
                {
                    targetId: '0',
                    targetAnchor: 'right',
                    sourceAnchor: 'left',
                    style: { strokeDasharray: '5,5' }
                }
            ]}
        >
            <div draggable onDragEnd={(event) => onDrop(event)} style={styles.node}>
                oi
            </div>
        </ArcherElement>
    )
}