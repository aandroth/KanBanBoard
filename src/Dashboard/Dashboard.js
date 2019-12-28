import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProject, getTasksForProject, changeProjectIdx } from '../Redux/Actions';
import { deleteProjectDb, getTasksOfProjectOrganizedByCategory } from '../ServerSide/ServerActions';

const updateUrl = (projectkey) => {
    return "updateproject?k=" + projectkey;
}

const Project = ({ userId, deleteFn, loadFn, changeFn, title, subtitle, projKey, onClick, selectProject }) => {
    console.log("props.projKey: " + projKey);
    return (
        <div className="project_in_dashboard">
            <p style={{ top: "10px", left: "10px" }}>Type</p>
            <div className="project_delete_button">
                <button onClick={() => onClick(userId, projKey, deleteFn)}>Delete</button>
            </div>
            <div className="title_and_subtitle">
                <p className="project_title">
                    {title}
                </p>
                <p className="project_subtitle">
                    {subtitle}
                </p>
            </div>
            <div style={{ width: "10%", textAlign: "right", padding: "10px", right: "0px", border: "solid red 1px" }}>
                <Link to="projectview"><button onClick={() => selectProject(userId, projKey, loadFn, changeFn)}>View</button></Link>
                <br />
                <Link to={updateUrl(projKey)}><button>Update</button></Link>
                <br />
            </div>
        </div>
    )
}

class Dashboard extends React.Component {

    async deleteProjectFromLocalAndDb(userId, projId, deleteFn) {
        console.log("this.props.project_idx: " + projId);
        console.log("userId: " + userId);
        let success = await deleteProjectDb(userId, projId);
        if (success) {
            console.log("Delete was successful");
            deleteFn(projId);
        }
        else {
            console.log("Delete failed");
            alert("Delete FAILED");
            // Maybe reload the projects
        }
    }
    async loadProjectFromDb(userId, projId, loadFn, changeFn) {
        console.log("this.props.project_idx: " + projId);
        console.log("userId: " + userId);
        let categories = await getTasksOfProjectOrganizedByCategory(userId, projId);
        if (categories != null) {
            console.log("Get was successful");
            loadFn(projId, categories);
            changeFn(projId);
        }
        else {
            console.log("get failed");
            alert("get FAILED");
            // Maybe reload the projects
        }
    }

    render() {
        return (
            <div>
                <Link to={"addproject?u=" + this.props.user_key}><button>Create Project</button></Link>
                <ul>
                    {this.props.project_list.map(t => <Project userId={this.props.user_key} deleteFn={this.props.deleteProject} loadFn={this.props.getTasksForProject} changeFn={this.props.changeProjectIdx} title={t.title} subtitle={t.subtitle} projKey={t.key} key={t.key} onClick={this.deleteProjectFromLocalAndDb} selectProject={this.loadProjectFromDb} />)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    project_list: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list,
    project_idx: state.reducerFn.project_idx,
    user_key: state.reducerFn.active_user.key,
})

const mapDispatchToProps = {
    deleteProject,
    getTasksForProject,
    changeProjectIdx,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);