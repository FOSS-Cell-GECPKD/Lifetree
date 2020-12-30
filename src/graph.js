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
          bgColor: '#FFFFFF',
          color: 'black',
          strokeColor: '#252525',
          borderRadius: '10px',
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
    if(fromSelect && toSelect){
      branches[fromSelect].merge(branches[toSelect]);
    }
  };

  const commitToBranch = (branch, value) => {
    if(branch){
      branches[branch].commit({
        subject: value,
        style: {
          // Specific style for this commit
        },
      });
    }
 	};

  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.addBranch();
        }}
      >
        <input id="branchNameInput" className="branchNameInput" type="text" placeholder="Branch name" onChange={this.handleChange("branchName")}/>
        <button id="branchNameButton" className="addBranchButton">Add a branch</button>
      </form>
      
	    <input id="commitBranchInput"
        type="text" 
        placeholder="What to Commit" 
        className="commitInput"
      />
      <button id="commitBranchButton" onClick={() => commitToBranch(document.getElementById('commitBranchSelect').value, document.getElementById('commitBranchInput').value)}>Commit</button>
      <select id="commitBranchSelect" name="Branch">
        <option value="" disabled selected hidden>Branch</option>
        {branches.map((dropDownCommitBranchName, idy) => <option key={idy} value={`${idy}`}>{dropDownCommitBranchName.name}</option>)}
      </select>

      <select id="fromBranch" name="Branch">
        <option value="" disabled selected hidden>Branch From</option>
        {branches.map((dropDownFromBranchName, idx) => <option key={idx} value={`${idx}`}>{dropDownFromBranchName.name}</option>)}
      </select>
      
      <select id="toBranch" name="Branch">
        <option value="" disabled selected hidden>Branch To</option>
        {branches.map((dropDownToBranchName, idx) => <option key={idx} value={`${idx}`}>{dropDownToBranchName.name}</option>)}
      </select>
      
      <button id="mergeButton" onClick={() => mergeBranch(document.getElementById('toBranch').value, document.getElementById('fromBranch').value)}>Merge</button>
    
      <button id="clearButton" className="clearButton" onClick={this.clear}>clear</button>

      <button id="pngExportButton" className="pngExportButton" onClick={() => exportComponentAsPNG(this.componentRef)}>
        Export As PNG
      </button>

      <div className="graph">
        <>
          <Gitgraph
            ref={this.componentRef}
            options={{
              orientation: "vertical",
              author: "",
              template: templateExtend(TemplateName.Metro, {
                commit: {
                  message: {
                    displayAuthor: false,
                    displayBranch: true,
                    displayHash: false,
                  },
                }
              }),
            }}
            children={(gitgraph) => this.setState({ gitgraph })}
          />
        </>
      </div>

    </React.Fragment>
  );
}
}

export default Graph;