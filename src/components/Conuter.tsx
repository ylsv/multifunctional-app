import React, {useState} from 'react';
import './Counter.scss'

export const Conuter = () => {
    const [count, setConut] = useState(0)

    const increment = () => setConut(prev => prev + 1)
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>increment</button>
        </div>
    );
};

