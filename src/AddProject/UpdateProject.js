import React from 'react';
import './AddProject.css';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { updateProject } from '../Redux/Actions';


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
            if (this.props.project_list[ii].key == this.mProjectKey) {
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
        console.log("mTitle: " + this.mTitle + " mSummary: " + this.mSubtitle + " mAcc_Crit: " + this.mDescription);
        console.log(" mDue_Date: " + this.mStart_Date + " mPriority: " + this.mEnd_Date + " key: " + this.mProjectKey);
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

    render() {
        console.log("In render: mTitle: " + this.mTitle);
        return (
            <div>
                <Link to="dashboard"><button>Back to Project Board</button></Link>
                <Route render={({ history }) => (
                    <form
                        className="Column-Form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            let _title = document.getElementById("title").value;
                                if (!_title.trim()) {
                                    alert("Bad title entry!");
                                    return;
                                }
                            let _subtitle = document.getElementById("summ").value;
                            if (!_subtitle.trim()) {
                                alert("Bad summary entry!");
                                return;
                            }
                            let _description = document.getElementById("acc-crit").value;
                            if (!_description.trim()) {
                                alert("Bad acceptance entry!");
                                return;
                            }
                            let _start_date = document.getElementById("due-date").value;
                            if (!_start_date.trim()) {
                                alert("Bad date entry!");
                                return;
                            }
                            let _end_date = document.getElementById("priority").value;
                            if (!_end_date.trim()) {
                                alert("Bad priority entry!");
                                return;
                            }
                            console.log("Dispatching with mProjectIdx: " + this.mProjectIdx + ", mProjectKey: " + this.mProjectKey)
                            this.props.dispatch(updateProject(_title, _subtitle, _description, _start_date, _end_date, this.mProjectIdx, this.mProjectKey));
                            history.push("dashboard");
                        }}>
                        <InputField ID="title" type="text" text={this.mTitle} />
                        <br />
                        <InputField ID="subtitle" type="text" text={this.mSubtitle} />
                        <br />
                        <InputField ID='description' type="text" text={this.mDescription} />
                        <br />
                        <InputField ID='start_date' type="date" text={this.mStart_Date} />
                        <br />
                        <InputField ID='end_date' type="text" text={this.mEnd_Date} />
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                )} />
            </div>
        );
    }
}

const mapPropsToState = state => ({
    project_list: state.reducerFn.project_list,
})


export default connect(
    mapPropsToState,
    null
)(UpdateProject);