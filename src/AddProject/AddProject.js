import React from 'react';
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
        <div>
            <Link to="dashboard"><button>Cancel</button></Link>
            <br />
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
                        let _subtitle = document.getElementById("subtitle").value;
                        if (!_subtitle.trim()) {
                            alert("Bad entry!");
                            return;
                        }
                        let _description = document.getElementById("description").value;
                        if (!_description.trim()) {
                            alert("Bad entry!");
                            return;
                        }
                        let _start_date = document.getElementById("start_date").value;
                        if (!_start_date.trim()) {
                            alert("Bad entry!");
                            return;
                        }
                        let _end_date = document.getElementById("end_date").value;
                        if (!_end_date.trim()) {
                            alert("Bad entry!");
                            return;
                        }
                        verifyProjectCreation(_title, _subtitle, _description, _start_date, _end_date, history);
                    }}>
                    <InputField ID="title" type="text" placeholder="Title" />
                    <br />
                    <InputField ID="subtitle" type="text" placeholder="Sub Title" />
                    <br />
                    <InputField ID="description" type="text" placeholder="Description" />
                    <br />
                    <InputField ID="start_date" type="text" placeholder="Start Date" />
                    <br />
                    <InputField ID="end_date" type="text" placeholder="End Date" />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            )} />
        </div>
    );
}

export default connect()(AddProject);