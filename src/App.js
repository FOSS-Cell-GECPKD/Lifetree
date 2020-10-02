import React from 'react';
import './App.css'
import Graph from "./newgraph";
//import NewGraph from "./newgraph"

function App() {
    return (<div>
            <div className="header">
                <h1>LifeTree</h1>
            </div>

            <div>
                <Graph />

            </div>
        </div>
    );
}

export default App;
