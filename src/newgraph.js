import React from "react";
import {Gitgraph} from "@gitgraph/react";
//import { Gitgraph, Branch } from "@gitgraph/react";
//const gitgraph = require("@gitgraph/react")

let master;


class Graph extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

            branches: [],
            commitMessage:'',
            commitMessage2:''
        }
    }


    addCommit = () => {
        // this.state.gitgraph.commit(this.state.commitMessage);
        master.commit(this.state.commitMessage)
    }

    changeHandler = (event) => {
        this.setState({
            commitMessage: event.target.value
        });
    }
    changeHandler2 = (event) => {
        this.setState({
            commitMessage: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.addCommit();
    }

    createNewBranch = () => {

            let branch1=master.branch(this.state.commitMessage)
            branch1.commit(this.state.commitMessage)


        }



    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type="text" value={this.state.commitMessage} onChange={this.changeHandler}/>
                    <input type="submit" value="Commit on Life"/>
                    {//<input type="text" value={this.state.commitMessage2} onChange={this.changeHandler2}/>
                    }
                    <input type="button" onClick={this.createNewBranch} value="create new branch"/>
                </form>
                <button >Clear</button>
                <Gitgraph>
                    {(gitgraph)=>{
                        master = gitgraph.branch("master")
                    }}
                </Gitgraph>
            </div>
        );
    }
}
export default Graph