import React from 'react';
import './AddProjectTask.css';
import { connect } from 'react-redux';
import { addTask } from '../Redux/Actions';
import { Route, Link } from 'react-router-dom';

const InputField = (props) => {
    return (
        <input id={props.ID} className="formInput" type="text" name={props.name} placeholder={props.placeholder} />
    )
}

const AddProjectTask = ({ dispatch }) => {
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
                        alert("Bad entry!");
                        return;
                    }
                        let _summ = document.getElementById("summ").value;
                        if (!_summ.trim()) {
                        alert("Bad entry!");
                        return;
                    }
                        let _acc = document.getElementById("acc-crit").value;
                        if (!_acc.trim()) {
                        alert("Bad entry!");
                        return;
                    }
                        let _due = document.getElementById("due-date").value;
                        if (!_due.trim()) {
                        alert("Bad entry!");
                        return;
                    }
                        let _pri = document.getElementById("priority").value;
                        if (!_pri.trim()) {
                        alert("Bad entry!");
                        return;
                    }
                        let _cat = document.getElementById("category").value;
                    if (!_cat.trim()) {
                        alert("Bad entry!");
                        return;
                    }
                        console.log("Sending to add with title " + _title + " and " + _cat);
                        dispatch(addTask(_title, _summ, _acc, _due, _pri, _cat));
                        history.push("projectview");
                }}>
                    <InputField ID="title" type="text" placeholder="Title" />
                    <br />
                    <InputField ID="summ" type="text" placeholder="Summary" />
                    <br />
                    <InputField ID='acc-crit' type="text" placeholder="Acceptance Criteria" />
                    <br />
                    <InputField ID='due-date' type="date" placeholder="Due Date" />
                    <br />
                    <InputField ID='priority' type="text" placeholder="Priority" />
                    <br />
                    <InputField ID='category' type="text" placeholder="Category" />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            )} />
        </div>
    );
}

export default connect()(AddProjectTask);