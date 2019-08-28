import React from 'react';
import './AddProjectTask.css';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { updateTask, deleteTask, initFn } from '../Redux/Actions';


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
    }

    componentDidMount() {
        this.getTaskFromCategories();
        this.updateDefaultValues();
        console.log("Update component mounted.");
    }

    getTaskFromCategories = () => {
        console.log("getTaskFromCategories.");
        let url = document.URL;
        let variables = url.split("/").pop();
        this.mCatId = Number(this.getURLParameter('c', variables)[1].split('=').pop());
        this.mTaskKey = Number(this.getURLParameter('k', variables)[1].split('=').pop());
        console.log("In update, mCatId: " + this.mCatId + " and mTaskKey: " + this.mTaskKey + " from " + variables + " inside of " + url)

        // Find the task
        for (let ii = 0; ii < this.props.catObj[this.mCatId].length; ++ii) {
            if (this.props.catObj[this.mCatId][ii].key == this.mTaskKey) {
                console.log("Found match at idx " + ii)
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

    getURLParameter = (name, location) => {
        return location.match(new RegExp('[?|&]' + name + '(.[0-9]*)'));
    }

    updateDefaultValues = () => {
        console.log("updateDefaultValues.");
        document.getElementById("title").value = this.mTitle;
        document.getElementById("summ").value = this.mSummary;
        document.getElementById("acc-crit").value = this.mAcc_Crit;
        document.getElementById("due-date").value = this.mDue_Date;
        document.getElementById("priority").value = this.mPriority;
        document.getElementById("category").value = this.mCatId;
    }

    render() {
        console.log("In render: mTitle: " + this.mTitle);
        return (
            <div>
                <Link to="projectview"><button>Back to Project Board</button></Link>
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
                            let _summ = document.getElementById("summ").value;
                                if (!_summ.trim()) {
                                alert("Bad summary entry!");
                                return;
                            }
                            let _acc = document.getElementById("acc-crit").value;
                                if (!_acc.trim()) {
                                alert("Bad acceptance entry!");
                                return;
                            }
                            let _due = document.getElementById("due-date").value;
                                if (!_due.trim()) {
                                alert("Bad date entry!");
                                return;
                            }
                            let _pri = document.getElementById("priority").value;
                                if (!_pri.trim()) {
                                alert("Bad priority entry!");
                                return;
                            }
                            let _cat = document.getElementById("category").value;
                            if (!_cat.trim() || isNaN(Number(_cat))) {
                                alert("Bad category entry!");
                                return;
                            }
                            console.log("Dispatching with mCatId: " + this.mCatId + ", mTaskIdx: " + this.mTaskIdx + ", mTaskKey: " + this.mTaskKey)
                            this.props.dispatch(updateTask(_title, _summ, _acc, _due, _pri, _cat, this.mTaskIdx, this.mTaskKey, this.mCatId));
                            history.push("projectview");
                        }}>
                        <InputField ID="title" type="text" text={this.mTitle} />
                        <br />
                        <InputField ID="summ" type="text" text={this.mSummary} />
                        <br />
                        <InputField ID='acc-crit' type="text" text={this.mAcc_Crit} />
                        <br />
                        <InputField ID='due-date' type="date" text={this.mDue_Date} />
                        <br />
                        <InputField ID='priority' type="text" text={this.mPriority} />
                        <br />
                        <InputField ID='category' type="text" text={this.mCatId} />
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                )} />
            </div>
        );
    }
}

const mapPropsToState = state => ({
    catObj: state.reducerFn.categories,
})


export default connect(
    mapPropsToState,
    null
)(UpdateProjectTask);