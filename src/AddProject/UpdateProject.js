import React, { useState } from 'react';
import './AddProject.css';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { updateProject } from '../Redux/Actions';
import { updateProjectDb } from '../ServerSide/ServerActions';
import { setSourceMapRange } from 'typescript';


const InputField = (props) => {

    console.log("In inputfield: " + props.text);
    return (
        <input id={props.ID} className="formInput" type="text" defaultValue={props.text} name={props.name} />
    )
}

class UpdateProject extends React.Component {
    constructor(props) {
        super(props);
        this.mTitle = "Error! DB title was not put in.";
        this.mSubtitle = "Error! DB mSubtitle was not put in.";
        this.mDescription = "Error! DB mDescription was not put in.";
        this.mStart_Date = "Error! DB mStart_Date was not put in.";
        this.mEnd_Date = "Error! DB mEnd_Date was not put in.";
        this.mProjectIdx = 0;
        this.mProjectKey = 0;

        this.state = {
            titleIsBad : false,
            subtitleIsBad : false,
            descriptionIsBad : false,
            startIsBad : false,
            endIsBad : false,
        }
    }

    componentDidMount() {
        this.getProjectFromList();
        this.updateDefaultValues();
        console.log("Project update component mounted.");
    }

    getProjectFromList = () => {
        console.log("getProjectFromCategories.");
        let url = document.URL;
        let variables = url.split("/").pop();
        this.mProjectKey = Number(this.getURLParameter('k', variables)[1].split('=').pop());
        console.log("In update, mProjectKey: " + this.mProjectKey + " from " + variables + " inside of " + url)

        // Find the project
        for (let ii = 0; ii < this.props.project_list.length; ++ii) {
            if (this.props.project_list[ii].key === this.mProjectKey) {
                console.log("Found match at idx " + ii)
                this.mProjectIdx = ii;
                break;
            }
        }
        const PATH = this.props.project_list[this.mProjectIdx];
        this.mTitle = PATH.title;
        this.mSubtitle = PATH.subtitle;
        this.mDescription = PATH.description;
        this.mStart_Date = PATH.start_date;
        this.mEnd_Date = PATH.end_date;
        console.log("mTitle: " + this.mTitle + " mSubtitle: " + this.mSubtitle + " mDescription: " + this.mDescription);
        console.log(" mStart_Date: " + this.mStart_Date + " mEnd_Date: " + this.mEnd_Date + " key: " + this.mProjectKey);
    }

    getURLParameter = (name, location) => {
        return location.match(new RegExp('[?|&]' + name + '(.[0-9]*)'));
    }

    updateDefaultValues = () => {
        console.log("updateDefaultValues.");
        document.getElementById("title").value = this.mTitle;
        document.getElementById("subtitle").value = this.mSubtitle;
        document.getElementById("description").value = this.mDescription;
        document.getElementById("start_date").value = this.mStart_Date;
        document.getElementById("end_date").value = this.mEnd_Date;
    }

    verifyUpdate = async (userId, _title, _subtitle, _description,
                            _start_date, _end_date, _idx, _key, history) => {

        let success = await updateProjectDb(userId, _key, _title, _subtitle, _description,
                                                                _start_date, _end_date);
        if (success) {
            console.log("Update successful!");
            console.log("Dispatching with mProjectIdx: " + this.mProjectIdx + ", mProjectKey: " + this.mProjectKey)
            this.props.dispatch(updateProject(_title, _subtitle, _description, _start_date, _end_date, this.mProjectIdx, this.mProjectKey));
            history.push("dashboard");
        }
        else {
            console.log("UPDATE FAILED");
            alert("UPDATE FAILED");
        }
    }

    render() {
        console.log("In render: mTitle: " + this.mTitle);
        return (
            <div className="project-to-create" >
                <Link to="dashboard"><button>Back to Project Board</button></Link>
                <Route render={({ history }) => (
                    <form
                        className="Column-Form"
                        onSubmit={(event) => {
                            let errorFound = false;
                            event.preventDefault();
                            let _title = document.getElementById("title").value;
                            if (!_title.trim()) {
                                this.setState({ titleIsBad: true });
                                errorFound = true;
                            }
                            let _subtitle = document.getElementById("subtitle").value;
                            if (!_subtitle.trim()) {
                                this.setState({ subtitleIsBad: true });
                                errorFound = true;
                            }
                            let _description = document.getElementById("description").value;
                            if (!_description.trim()) {
                                this.setState({ descriptionIsBad: true });
                                errorFound = true;
                            }
                            let _start_date = document.getElementById("start_date").value;
                            if (!_start_date.trim()) {
                                this.setState({ startIsBad: true });
                                errorFound = true;
                            }
                            let _end_date = document.getElementById("end_date").value;
                            if (!_end_date.trim()) {
                                this.setState({ endIsBad: true });
                                errorFound = true;
                            }

                            if (errorFound) {
                                return;
                            }

                            this.verifyUpdate(this.props.userId, _title, _subtitle, _description,
                                _start_date, _end_date, this.mProjectIdx, this.mProjectKey,
                                history);
                        }}>
                        <div className="add-project-title">
                            <input ID="title" type="text" placeholder="Title" onChange={() => this.setState({ titleIsBad: false })} />
                        </div>
                        {this.state.titleIsBad &&
                            <div className="project-input-error-bar">
                                <p style={{ color: "red" }}>The title can't be empty</p>
                            </div>
                        }
                        <div className="add-project-input">
                            <input ID="subtitle" type="text" placeholder="Sub Title" onChange={() => this.setState({ subtitleIsBad: false })} />
                        </div>
                        {this.state.subtitleIsBad &&
                            <div className="project-input-error-bar">
                                <p style={{ color: "red" }}>The subtitle can't be empty</p>
                            </div>
                        }
                        <div className="add-project-description" >
                            <textarea ID="description" type="textarea" rows="50" cols="50" placeholder="Description" onChange={() => this.setState({ descriptionIsBad: false })} />
                        </div>
                        {this.state.descriptionIsBad &&
                            <div className="project-input-error-bar">
                                <p style={{ color: "red" }}>The description can't be empty</p>
                            </div>
                        }
                        <div className="add-project-input">
                            <input ID="start_date" type="text" placeholder="Start Date" onChange={() => this.setState({ startIsBad: false })} />
                        </div>
                        {this.state.startIsBad &&
                            <div className="project-input-error-bar">
                                <p style={{ color: "red" }}>The start date can't be empty</p>
                            </div>
                        }
                        <div className="add-project-input">
                            <input ID="end_date" type="text" placeholder="End Date" onChange={() => this.setState({ endIsBad: false })} />
                        </div>
                        {this.state.endIsBad &&
                            <div className="project-input-error-bar">
                                <p style={{ color: "red" }}>The end date can't be empty</p>
                            </div>
                        }
                        <input type="submit" value="Submit" />
                    </form>
                )} />
            </div>
        );
    }
}

const mapPropsToState = state => ({
    userId: state.reducerFn.active_user.key,
    project_list: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list,
})


export default connect(
    mapPropsToState,
    null
)(UpdateProject);