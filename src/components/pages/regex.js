import React, { useState } from 'react'

export default function Regex() {

    const [counter, setCounter] = useState(0);

    return (
        <div>
            <button onClick={() => setCounter(counter + 1)}>oi</button>
            <p>{counter}</p>
        </div>
    )
}
