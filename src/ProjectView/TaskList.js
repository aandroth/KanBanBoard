import React from 'react';
import './ProjectView.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTask, initFn } from '../Redux/Actions';
import { deleteTaskDb } from '../ServerSide/ServerActions';

const Task = ({ onClick, ID, Due, title, categoryID, userId, projId, deleteFn }) => {

    let updateUrlStr = "updateprojecttask?c=" + categoryID + "&k=" + ID;

    return (
        <li className="task-list-item">
            <div style={{ textAlign: "left", left: "10%" }}>
                <p>{title}</p>
                <p>{ID}</p>
                <p>{Due}</p>
            </div>
            <div>
                <Link to={updateUrlStr}><button>View/Update</button></Link>
                <button onClick={() => onClick(userId, projId, ID, categoryID, deleteFn)}>Delete</button>
            </div>
        </li>
    );
}

class TaskList extends React.Component {

    async deleteTaskFromLocalAndDb(userId, projId, id, catId, deleteFn) {
        console.log("projId: " + projId);
        console.log("userId: " + userId);
        let success = await deleteTaskDb(userId, projId, id);
        if (success) {
            console.log("Delete was successful");
            deleteFn(id, catId);
        }
        else {
            console.log("Delete failed");
            alert("Delete FAILED");
            // Maybe reload the projects
        }
    }

    render() {
        return (
            <div className="task-list">
                <div style={{ width: "100%", left: "50px", border: "solid blue 1px", fill: "blue" }}>
                    <h1>{this.props.title}</h1>
                </div>
                <div style={{ width: "100%", textAlign: "right", right: "0px", border: "solid red 1px" }}>
                    <ul>
                        {this.props.tasks.map(t => <Task
                            onClick={this.deleteTaskFromLocalAndDb}
                            ID={t.key} title={t.title} key={t.key} categoryID={this.props.ID}
                            Due={t.due_Date}
                            userId={this.props.userKey} projId={this.props.projKey}
                            deleteFn={this.props.deleteTask} />)}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userKey: state.reducerFn.active_user.key,
    projKey: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list[state.reducerFn.project_idx].key,
})

const mapDispatchToProps = {
    initFn,
    deleteTask,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)