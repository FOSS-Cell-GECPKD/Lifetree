import React from "react";
import { Gitgraph } from "@gitgraph/react";
import { exportComponentAsPNG } from "react-component-export-image";
import {templateExtend, TemplateName} from "@gitgraph/core";
import './graph.css';

//  This class renders git-graph
class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
      branchName: "",
    };
    this.componentRef = React.createRef();

  }

  // Function to add commit from state
  addCommit = (branch) => {
    branch.commit(this.state[`commitMessage${branch.name}`]);
  };

  //Function to add branch and adds branch name to branches array in state
  addBranch = () => {
    if (this.state.branches.map((b) => b.name).includes(this.state.branchName))
      return;

    this.setState(() => ({
      branches: [
        ...this.state.branches,
        this.state.gitgraph.branch({name:this.state.branchName,style: {
                label: {
                    bgColor: '#F2F2F2',
                    color: 'black',
                    strokeColor: '#252525',
                    borderRadius: 10,
                    font: '12pt serif',
                },
            },}),
      ],
    }));
  };

  // Handles input changes
  handleChange = (name) => (e) => {
    this.setState({ [name]: e.currentTarget.value });
  };

  // Clears state and git-graph
  clear = () => {
    this.state.gitgraph.clear();
    this.setState({
      branches: [],
    });
  };

  render() {
    const branches = this.state.branches;

    const mergeBranch = (fromSelect, toSelect) => {
	  	console.log(branches[fromSelect]);
	  	branches[fromSelect].merge(branches[toSelect]);
  	};

    return (
      <React.Fragment>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.addBranch();
          }}
        >
          <input className="branchNameInput" type="text" placeholder="Branch name" onChange={this.handleChange("branchName")}/>
          <button className="addBranchButton">Add a branch</button>
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
                placeholder="What to commit" 
                className="commitInput"
                value={this.state[`commitMessage${branch.name}`] ||""}
                onChange={this.handleChange(`commitMessage${branch.name}`)}
              />
              <button className="commitToButton">Commit on {branch.name}</button>
            </form>
          ))
        }

        <button className="clearButton" onClick={this.clear}>clear</button>
        <div className="graph">
        <>
        <Gitgraph
          ref={this.componentRef}
          options={{
            orientation: "vertical",
            author: " ",
            template: templateExtend(TemplateName.Metro, {
                commit: {
                    message: {
                        displayAuthor: false,
                        displayBranch: true,
                        displayHash: true,
                    },

                }
            }),
          }}
          children={(gitgraph) => this.setState({ gitgraph })}
        />
        </>
        </div>

        <button className="pngExportButton" onClick={() => exportComponentAsPNG(this.componentRef)}>
          Export As PNG
        </button>

        {/*<div className="mergeButtons">{
            //To render merge buttons
            branches.map((to) =>
              branches
                .filter((from) => to.name !== from.name)
                .map((from) => (
                  <button
                    key={`${to.name}->${from.name}`}
                    onClick={() => from.merge(to)}
                  >
                    Merge {to.name} into {from.name}
                  </button>
                ))
            )
          }
        </div>
        */}

        <br></br>

	    <h4 className="noNewLine">&emsp;Merge From : &emsp;</h4>

	    <select id="fromBranch" name="Branch">
	        {branches.map((dropDownFromBranchName, idx) => <option key={idx} value={`${idx}`}>{dropDownFromBranchName.name}</option>)}
	    </select>

	    <h4 className="noNewLine">&emsp;To : &emsp;</h4>

	    <select id="toBranch" name="Branch">
	        {branches.map((dropDownToBranchName, idx) => <option key={idx} value={`${idx}`}>{dropDownToBranchName.name}</option>)}
	    </select>

	    <br></br>

	    <button onClick={() => mergeBranch(document.getElementById('toBranch').value, document.getElementById('fromBranch').value)}>Merge</button>

      </React.Fragment>
    );
  }
}

export default Graph;