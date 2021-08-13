import React, {useState} from 'react';
import './AddProjectTask.css';
import { connect } from 'react-redux';
import { addTask } from '../Redux/Actions';
import { Route, Link } from 'react-router-dom';
import { addTaskDb } from '../ServerSide/ServerActions';

const InputField = (props) => {
    return (
        <input id={props.ID} className="formInput" type="text" name={props.name} placeholder={props.placeholder} />
    )
}

const AddProjectTask = ({ dispatch }) => {

    let [titleIsBad, setTitleIsBad] = useState(false);
    let [summaryIsBad, setSummaryIsBad] = useState(false);
    let [accIsBad, setAccIsBad] = useState(false);
    let [dueIsBad, setDueIsBad] = useState(false);
    let [priorityIsBad, setPriorityIsBad] = useState(false);

    document.body.style = { backgroundColor: "goldenrod" };

    function getURLParameter(name, location) {
        return location.match(new RegExp('[?|&]' + name + '(.[0-9]*)'));
    }

    async function verifyTaskCreation(_title, _summ, _acc, _dueSeconds, _pri, _cat, history) {

        let url = document.URL;
        let variables = url.split("/").pop();
        let userKey = Number(getURLParameter('u', variables)[1].split('=').pop());
        let projKey = Number(getURLParameter('p', variables)[1].split('=').pop());
        console.log("Sending to add with user " + userKey + " and proj " + projKey);

        let taskId = await addTaskDb(userKey, projKey, _title, _summ, _acc, _dueSeconds, _pri, _cat);

        if (taskId > 0) {
            dispatch(addTask(_title, _summ, _acc, _dueSeconds, _pri, _cat, taskId));
            history.push("projectview");
        }
        else {
            console.log("Failed to create a Task");
        }
    }

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var monthZero = "0";
    if (month > 9)
        monthZero = "";
    var day = dateObj.getUTCDate();
    var dayZero = "0";
    if (day > 9)
        dayZero = "";
    var year = dateObj.getUTCFullYear();
    var datePlaceholder = year + "-" + monthZero + month + "-" + dayZero + day;

    return (
        <div className="taskCreate-body">
            <Link to="projectview"><button>Back to Project Board</button></Link>
            <Route render={({ history }) => (
                <form
                    className="Column-Form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        let _title = document.getElementById("title").value;
                        if (!_title.trim()) {
                            setTitleIsBad(true);
                        }
                        let _summ = document.getElementById("summ").value;
                        if (!_summ.trim()) {
                            setSummaryIsBad(true);
                        }
                        let _acc = document.getElementById("acc-crit").value;
                        if (!_acc.trim()) {
                            setAccIsBad(true);
                        }
                        let _dueStr = document.getElementById("due-date").value;
                        if (!_dueStr.trim()) {
                            setDueIsBad(true);
                        }
                        let _due = new Date(_dueStr);
                        let _pri = document.getElementById("priority").value;
                        if (!_pri.trim()) {
                            setPriorityIsBad(true);
                        }
                        let _cat = document.getElementById("category").value;
                        if (!_cat.trim()) {
                            _cat = 0;
                        }

                        if (titleIsBad || summaryIsBad || accIsBad || dueIsBad || priorityIsBad) {
                            return;
                        }

                        verifyTaskCreation(_title, _summ, _acc, _due.getTime(), _pri, _cat, history);
                    }}>
                    <br />
                    <br />
                    <div className="task-input-master">
                        <div className="task-input-basic">
                            <input ID="title" type="text" placeholder="Title" onChange={() => setTitleIsBad(false)}/>
                        </div>
                        {titleIsBad &&
                            <div className="task-input-error-bar">
                                <p style={{ color: "red" }}>The title can't be empty</p>
                            </div>
                        }
                        <br />
                        <div className="task-input-summ">
                            <textarea ID="summ" type="textfield" rows="25" cols="50" placeholder="Summary/Logs" onChange={() => setSummaryIsBad(false)}></textarea>
                        </div>
                        {summaryIsBad &&
                            <div className="task-input-error-bar">
                                <p style={{ color: "red" }}>The summary can't be empty</p>
                            </div>
                        }
                        <br />
                        <div className="task-input-basic">
                            <input ID='acc-crit' type="text" placeholder="Acceptance Criteria" onChange={() => setAccIsBad(false)} />
                        </div>
                        {accIsBad &&
                            <div className="task-input-error-bar">
                                <p style={{ color: "red" }}>The acceptance criteria can't be empty</p>
                                <br />
                            </div>
                        }
                        <br />
                        <div className="task-input-basic">
                            <input ID='due-date' type="date" placeholder={datePlaceholder} onChange={() => setDueIsBad(false)} />
                        </div>
                        {dueIsBad &&
                            <div className="task-input-error-bar">
                                <p style={{ color: "red" }}>The due date can't be empty</p>
                            </div>
                        }
                        <br />
                        <div className="task-input-basic">
                            <input ID='priority' type="text" placeholder="Priority" onChange={() => setPriorityIsBad(false)} />
                        </div>
                        {priorityIsBad &&
                            <div className="task-input-error-bar">
                                <p style={{ color: "red" }}>The priority can't be empty</p>
                            </div>
                        }
                        <br />
                        <div className="task-input-basic">
                            <select name="Category" id="category" placeholder={0}>
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

export default connect()(AddProjectTask);