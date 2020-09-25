import React from 'react';
import './App.css'
//import GitgraphPlayground from './git'
import Graph from "./graph";

function App() {
    return (<div>
            <div className="header">
                <h1>LifeTree</h1>
            </div>

            <div className="row">
                <Graph />
            </div>
        </div>
    );
}

export default App;
