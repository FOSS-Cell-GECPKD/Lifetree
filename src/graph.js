import React from "react";
import {Gitgraph} from "@gitgraph/react";

class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            branchName:''
        };
    }

    addCommit = (branch) => {

        branch.commit(this.state[`commitMessage${branch.name}`]);

    };

    addBranch = () => {

        this.setState(() => ({
            branches: [...this.state.branches,this.state.gitgraph.branch(this.state.branchName)]
        }));
    };

    handleChange = (name) => (e) => {
        this.setState({[name]: e.currentTarget.value});
    };

    clear = () => {
        this.state.gitgraph.clear();
        this.setState({
            branches: [],
        });
    };


    render() {
        const branches = this.state.branches
        return (
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.addBranch();
                    }}>

                    <input type="text" onChange={this.handleChange("branchName")}/>
                    <button>Add a branch</button>

                </form>


                {branches.map((branch) => (
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

                <button onClick={this.clear}>clear</button>
                <Gitgraph children={(gitgraph) => this.setState({gitgraph})}/>
            </div>
        );
    }
}


export default Graph