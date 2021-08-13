import React, { useState } from 'react';
import './AddProject.css';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import { addProject } from '../Redux/Actions';
import { connect } from 'react-redux';
import { addProjectDb } from '../ServerSide/ServerActions';

const InputField = (props) => {
    return (
        <input className="formInput" id={props.ID} type={props.type} name={props.name} placeholder={props.placeholder} />
    )
}

const AddProject = ({ dispatch }) => {

    let [titleIsBad, setTitleIsBad] = useState(false);
    let [subtitleIsBad, setSubtitleIsBad] = useState(false);
    let [descriptionIsBad, setDescriptionIsBad] = useState(false);
    let [startIsBad, setStartIsBad] = useState(false);
    let [endIsBad, setEndIsBad] = useState(false);

    function getUserKeyFromUrl(){
        console.log("getProjectFromCategories.");
        let url = document.URL;
        let variables = url.split("/").pop();
        let userKey = Number(getURLParameter('u', variables)[1].split('=').pop());
        return userKey;
    }

    function getURLParameter(name, location){
        return location.match(new RegExp('[?|&]' + name + '(.[0-9]*)'));
    }

    async function verifyProjectCreation(_title, _subtitle, _description, _start_date, _end_date, history) {

        let userKey = getUserKeyFromUrl();
        console.log("verify userKey: " + userKey);
        try {
            let newProjKey = await addProjectDb(userKey, _title, _subtitle, _description, _start_date, _end_date);
            if (newProjKey > 0)
                dispatch(addProject(newProjKey, _title, _subtitle, _description, _start_date, _end_date));
        }
        catch (err) {
            console.log("Error! " + err.message);
        }
        history.push("dashboard");
    }

    return (
        <div className="project-to-create">
            <Link to="dashboard"><button>Cancel</button></Link>
            <br />
            <Route render={({ history }) => (
                <form
                    className="Column-Form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        let _title = document.getElementById("title").value;
                        if (!_title.trim()) {
                            setTitleIsBad(true);
                        }
                        let _subtitle = document.getElementById("subtitle").value;
                        if (!_subtitle.trim()) {
                            setSubtitleIsBad(true);
                        }
                        let _description = document.getElementById("description").value;
                        if (!_description.trim()) {
                            setDescriptionIsBad(true);
                        }
                        let _start_date = document.getElementById("start_date").value;
                        if (!_start_date.trim()) {
                            setStartIsBad(true);
                        }
                        let _end_date = document.getElementById("end_date").value;
                        if (!_end_date.trim()) {
                            setEndIsBad(true);
                        }
                        if (titleIsBad || subtitleIsBad || descriptionIsBad || startIsBad || endIsBad) {
                            return;
                        }
                        verifyProjectCreation(_title, _subtitle, _description, _start_date, _end_date, history);
                    }}>
                    <div className="add-project-title">
                        <input ID="title" type="text" placeholder="Title" onChange={() => setTitleIsBad(false)} />
                    </div>
                    {titleIsBad &&
                        <div className="project-input-error-bar">
                            <p style={{ color: "red" }}>The title can't be empty</p>
                        </div>
                    }
                    <div className="add-project-input">
                        <input ID="subtitle" type="text" placeholder="Sub Title" onChange={() => setSubtitleIsBad(false)} />
                    </div>
                    {subtitleIsBad &&
                        <div className="project-input-error-bar">
                            <p style={{ color: "red" }}>The subtitle can't be empty</p>
                        </div>
                    }
                    <div className="add-project-description" >
                        <textarea ID="description" type="textarea" rows="50" cols="50" placeholder="Description" onChange={() => setDescriptionIsBad(false)} />
                    </div>
                    {descriptionIsBad &&
                        <div className="project-input-error-bar">
                            <p style={{ color: "red" }}>The description can't be empty</p>
                        </div>
                    }
                    <div className="add-project-input">
                        <input ID="start_date" type="text" placeholder="Start Date" onChange={() => setStartIsBad(false)} />
                    </div>
                    {startIsBad &&
                        <div className="project-input-error-bar">
                            <p style={{ color: "red" }}>The start date can't be empty</p>
                        </div>
                    }
                    <div className="add-project-input">
                        <input ID="end_date" type="text" placeholder="End Date" onChange={() => setEndIsBad(false)} />
                    </div>
                    {endIsBad &&
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

export default connect()(AddProject);