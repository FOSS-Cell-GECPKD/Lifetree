import React from 'react';
import './App.css'
import Graph from "./graph"

/* TODO:
    Add class-names to elements so they can be styled
 */

function App() {
    return (<React.Fragment>
            <div className="header">
                <h1>LifeTree</h1>
            </div>

            <div>
                <Graph/>
            </div>
        </React.Fragment>
    );
}

export default App;
