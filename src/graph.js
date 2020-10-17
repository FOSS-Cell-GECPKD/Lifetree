import React from "react";
import {Gitgraph} from "@gitgraph/react";
import {exportComponentAsPNG} from "react-component-export-image";

/* TODO:
    Add class-names to elements so they can be styled
 */

//  This class renders git-graph
class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            branchName:''
        };
        this.componentRef = React.createRef();
    }

    // Function to add commit from state
    addCommit = (branch) => {

        branch.commit(this.state[`commitMessage${branch.name}`]);

    };

    //Function to add branch and adds branch name to branches array in state
    addBranch = () => {
        if (this.state.branches
            .map((b) => b.name)
            .includes(this.state.branchName)
        )
                  return;

        this.setState(() => ({
            branches: [...this.state.branches,this.state.gitgraph.branch(this.state.branchName)]
        }));
    };

    // Handles input changes
    handleChange = (name) => (e) => {
        this.setState({[name]: e.currentTarget.value});
    };

    // Clears state and git-graph
    clear = () => {
        this.state.gitgraph.clear();
        this.setState({
            branches: [],
        });
    };


    render() {
        const branches = this.state.branches
        return (
            <React.Fragment>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.addBranch();

                    }}>

                    <input type="text" onChange={this.handleChange("branchName")}/>
                    <button>Add a branch</button>

                </form>


                {
                    //To render "Commit On specific-branch" button from branches array
                    branches.map((branch) => (
                    <form
                        key={branch.name}
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.addCommit(branch);
                        }}
                    >

                        <input
                            type="text"
                            value={this.state[`commitMessage${branch.name}`]}
                            onChange={this.handleChange(`commitMessage${branch.name}`)}
                        />
                        <button>Commit on {branch.name}</button>

                    </form>
                ))}
                <div>
                {
                    //To rende
                    branches.map((to) =>
                    branches.filter((from) => to.name !== from.name).map((from) => (
                        <button
                            key={`${to.name}->${from.name}`}
                            onClick={() => from.merge(to)}
                        >
                            Merge {to.name} into {from.name}
                        </button>
                    )),
                )}
                </div>

                <button onClick={this.clear}>clear</button>

                <Gitgraph ref={this.componentRef}
                          children={(gitgraph) => this.setState({gitgraph})}/>

                <button onClick={() => exportComponentAsPNG(this.componentRef)}>
                    Export As PNG
                </button>
            </React.Fragment>
        );
    }
}


export default Graph