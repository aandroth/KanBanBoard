import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    deleteProject, getTasksForProject,
    changeProjectIdx, updateDashboardScroll, updateProjectScroll,
} from '../Redux/Actions';
import { deleteProjectDb, getTasksOfProjectOrganizedByCategory } from '../ServerSide/ServerActions';

const updateUrl = (projectkey) => {
    return "updateproject?k=" + projectkey;
}

const Project = ({ userId, deleteFn, loadFn, changeFn,
                   title, subtitle, description, projKey,
                   onClick, selectProject }) => {
    console.log("props.projKey: " + projKey);
    return (
        <div className="project-and-delete-in-dashboard">
            <Link to="projectview">
                <div className="project-in-dashboard"
                    onClick={() => selectProject(userId, projKey, loadFn, changeFn)}>
                    <div className="title-and-subtitle">
                        <p className="project-title">
                            {title}
                            <br/>
                        </p>
                        <p className="project-subtitle">
                            {description}
                        </p>
                    </div>
                    <div className="view-and-update">
                        <Link to="projectview">
                            <button className="project-view-button"
                                onClick={() => selectProject(userId, projKey, loadFn, changeFn)}>
                                View
                            </button>
                        </Link>
                        <Link to={updateUrl(projKey)}>
                            <button className="project-update-button">Update</button>
                        </Link>
                    </div>
                </div>
            </Link>
            <div className="project-delete-button">
                <button onClick={() => onClick(userId, projKey, deleteFn)}>Delete</button>
            </div>
        </div>
    );
}

class Dashboard extends React.Component {

    componentDidMount() {
        window.scrollTo(0, this.props.scrollPos);
        this.props.updateProjectScroll(0);
    }

    componentWillUnmount() {
        this.props.updateDashboardScroll(window.scrollY);
        window.scrollTo(0, 0);
    }

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
        }
    }

    render() {

        return (
            <div className="project-list">
                <Link to={"addproject?u=" + this.props.user_key}><button>Create Project</button></Link>
                <ul>
                    {this.props.project_list.map(
                        t => <Project
                            userId={this.props.user_key}
                            deleteFn={this.props.deleteProject}
                            loadFn={this.props.getTasksForProject}
                            changeFn={this.props.changeProjectIdx}

                            title={t.title}
                            subtitle={t.subtitle}
                            description={t.description}
                            projKey={t.key}
                            key={t.key}
                            onClick={this.deleteProjectFromLocalAndDb}
                            selectProject={this.loadProjectFromDb}
                     />)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    project_list: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list,
    project_idx: state.reducerFn.project_idx,
    user_key: state.reducerFn.active_user.key,
    scrollPos: state.reducerFn.dashboardPageScroll,
})

const mapDispatchToProps = {
    deleteProject,
    getTasksForProject,
    changeProjectIdx,
    updateDashboardScroll,
    updateProjectScroll,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);