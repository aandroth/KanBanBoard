import React from 'react';
import './AddProjectTask.css';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { updateTask } from '../Redux/Actions';
import { updateTaskDb } from '../ServerSide/ServerActions';
import { format } from 'mysql';


const InputField = (props) => {

    console.log("In inputfield: " + props.text);
    return (
        <input id={props.ID} className="formInput" type="text" defaultValue={props.text} name={props.name} />
    )
}

class UpdateProjectTask extends React.Component {
    constructor(props) {
        super(props);
        this.mTitle = "Error! DB title was not put in.";
        this.mSummary = "Error! DB mSummary was not put in.";
        this.mAcc_Crit = "Error! DB mAcc_Crit was not put in.";
        this.mDue_Date = "Error! DB mDue_Date was not put in.";
        this.mPriority = "Error! DB priority was not put in.";
        this.mCatId = 0;
        this.mTaskIdx = 0;
        this.mTaskKey = 0;

        this.state = {
            titleIsBad: false,
            summaryIsBad: false,
            accIsBad: false,
            dueIsBad: false,
            priorityIsBad: false,
        }
    }

    componentDidMount() {
        this.getTaskFromCategories();
        this.updateDefaultValues();
        console.log("Update component mounted.");
    }
                              
    verifyTaskUpdate = async (userKey, projKey, _title, _summ, _acc, _dueSeconds, _pri, _cat, history) => {

        console.log("In update, mCatId: " + this.mCatId + " and mTaskKey: " + this.mTaskKey + " and category: " + _cat)
        let success = await updateTaskDb(userKey, projKey, this.mTaskKey, _title, _summ, _acc, _dueSeconds, _pri, _cat);
        if (success) {
            this.props.dispatch(updateTask(_title, _summ, _acc, _dueSeconds, _pri, _cat, this.mTaskIdx, this.mTaskKey, this.mCatId));
            history.push("projectview");
        }
        else {
            console.log("Failed update");
        }
    }

    getTaskFromCategories = () => {
        console.log("getTaskFromCategories.");
        let url = document.URL;
        let variables = url.split("/").pop();
        try {
            this.mCatId = Number(this.getURLParameter('c', variables)[1].split('=').pop());
            this.mTaskKey = Number(this.getURLParameter('k', variables)[1].split('=').pop());
            console.log("In update, mCatId: " + this.mCatId + " and mTaskKey: " + this.mTaskKey + " from " + variables + " inside of " + url)

            // Find the task
            for (let ii = 0; ii < this.props.catObj[this.mCatId].length; ++ii) {
                if (this.props.catObj[this.mCatId][ii].key === this.mTaskKey) {
                    console.log("Found match at catIdx " + ii)
                    console.log("Key is" + this.mTaskKey)
                    this.mTaskIdx = ii;
                    break;
                }
            }
            const PATH = this.props.catObj[this.mCatId][this.mTaskIdx];
            this.mTitle = PATH.title;
            this.mSummary = PATH.summary;
            this.mAcc_Crit = PATH.acc_Crit;
            this.mDue_Date = PATH.due_Date;
            this.mPriority = PATH.priority;
            console.log("mTitle: " + this.mTitle + "mSummary: " + this.mSummary + "mAcc_Crit: " + this.mAcc_Crit);
            console.log("mDue_Date: " + this.mDue_Date + "mPriority: " + this.mPriority);
        }
        catch (error) {
            this.mTitle = "Backup Title";
            this.mSummary = "Backup mSummary";
            this.mAcc_Crit = "Backup mAcc_Crit";
            this.mDue_Date = 1625097600001;
            this.mPriority = 0;
        }
    };

    getURLParameter = (name, location) => {
        return location.match(new RegExp('[?|&]' + name + '(.[0-9]*)'));
    };

    updateDefaultValues = () => {
        console.log("updateDefaultValues.");
        document.getElementById("title").value = this.mTitle;
        document.getElementById("summ").value = this.mSummary;
        document.getElementById("acc-crit").value = this.mAcc_Crit;
        console.log("About to format the date.");
        document.getElementById("due-date").value = this.formattedDate(this.mDue_Date);
        document.getElementById("priority").value = this.mPriority;
        document.getElementById("category").value = this.mCatId;
    };

    formattedDate = (dateSeconds) => {

        console.log("formatting Date");
        var dateObj = new Date();
        dateObj.setTime(dateSeconds);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var monthZero = "0";
        if (month > 9)
            monthZero = "";
        var day = dateObj.getUTCDate();
        var dayZero = "0";
        if (day > 9)
            monthZero = "";
        var year = dateObj.getUTCFullYear();
        var formattedDate = year + "-" + monthZero + month + "-" + dayZero + day;
        console.log("formattedDate: "+formattedDate);
        return formattedDate;
        return "";
    };

    render() {
        console.log("In render: mTitle: " + this.mTitle);
        return (
            <div className="taskUpdate-body">
                <Link to="projectview"><button>Back to Project Board</button></Link>
                <Route render={({ history }) => (
                    <form className="Column-Form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            let errorFound = false;
                            let _title = document.getElementById("title").value;
                            if (!_title.trim()) {
                                this.setState({ titleIsBad: true });
                                errorFound = true;
                            }
                            let _summ = document.getElementById("summ").value;
                            if (!_summ.trim()) {
                                this.setState({ summaryIsBad: true });
                                errorFound = true;
                            }
                            let _acc = document.getElementById("acc-crit").value;
                            if (!_acc.trim()) {
                                this.setState({ accIsBad: true });
                                errorFound = true;
                            }
                            let _dueStr = document.getElementById("due-date").value;
                            if (!_dueStr.trim()) {
                                this.setState({ dueIsBad: true });
                                errorFound = true;
                            }
                            let _dueDate = new Date(_dueStr);
                            let _due = _dueDate.getTime();
                            let _pri = document.getElementById("priority").value;
                            if (!_pri.trim()) {
                                this.setState({ priorityIsBad: true });
                                errorFound = true;
                            }
                            let _cat = document.getElementById("category").value;

                            if (errorFound) {
                                return;
                            }

                            this.verifyTaskUpdate(this.props.userKey, this.props.projKey, _title, _summ, _acc, _due, _pri, _cat, history);
                        }}>
                        <br />
                        <br />
                        <div className="task-input-master">
                            <div className="task-input-basic">
                                <input ID="title" type="text" text={this.mTitle} />
                            </div>
                            {this.state.titleIsBad &&
                                <div className="task-input-error-bar">
                                    <p style={{ color: "red" }}>The title can't be empty</p>
                                </div>
                            }
                            <br />
                            <div className="task-input-summ">
                                <textarea ID="summ" type="textfield" rows="25" cols="50" text={this.mSummary}></textarea>
                            </div>
                            {this.state.summaryIsBad &&
                                <div className="task-input-error-bar">
                                    <p style={{ color: "red" }}>The summary can't be empty</p>
                                </div>
                            }
                            <br />
                            <div className="task-input-basic">
                                <input ID='acc-crit' type="text" text={this.mAcc_Crit} />
                            </div>
                            {this.state.accIsBad &&
                                <div className="task-input-error-bar">
                                    <p style={{ color: "red" }}>The acceptance criteria can't be empty</p>
                                </div>
                            }
                            <br />
                            <div className="task-input-basic">
                                <input ID='due-date' type="date" text={"0000-00-00"} />
                            </div>
                            {this.state.dueIsBad &&
                                <div className="task-input-error-bar">
                                    <p style={{ color: "red" }}>The due date can't be empty</p>
                                </div>
                            }
                            <br />
                            <div className="task-input-basic">
                                <input ID='priority' type="text" text={this.mPriority} />
                            </div>
                            {this.state.priorityIsBad &&
                                <div className="task-input-error-bar">
                                    <p style={{ color: "red" }}>The priority can't be empty</p>
                                </div>
                            }
                            <br />
                            <div className="task-input-basic">
                                <select name="Category" id="category">
                                    <option value={0}>To Do</option>
                                    <option value={1}>In Progress</option>
                                    <option value={2}>Done</option>
                                </select>
                            </div>
                            <br />
                            <div className="task-input-basic">
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </form>
                )} />
            </div>
        );
    }
}

const mapPropsToState = state => ({
    userKey: state.reducerFn.active_user.key,
    projKey: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list[state.reducerFn.project_idx].key,
    catObj: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list[state.reducerFn.project_idx].categories,
})


export default connect(
    mapPropsToState,
    null
)(UpdateProjectTask);