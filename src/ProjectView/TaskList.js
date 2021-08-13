import React from 'react';
import './ProjectView.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTask, initFn } from '../Redux/Actions';
import { deleteTaskDb } from '../ServerSide/ServerActions';


const formattedDate = (dateSeconds) => {

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
    console.log("formattedDate: " + formattedDate);
    return formattedDate;
};

const Task = ({ onClick, ID, DueTime, title, categoryID, Summ, userId, projId, deleteFn }) => {

    let updateUrlStr = "updateprojecttask?c=" + categoryID + "&k=" + ID;
    let dueDate = formattedDate(DueTime);

    return (
        <li className="task-list-item">
            <div className="task-list-item-content">
                <p className="task-list-item-title">{title}</p>
                <p className="task-list-item-summary">{Summ}</p>
                <p className="task-list-item-due">{"Due on: " + dueDate}</p>
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
                <div className="task-list-title">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="task-list-content">
                    <ul>
                        {this.props.tasks.map(t => <Task
                            onClick={this.deleteTaskFromLocalAndDb}
                            ID={t.key} title={t.title} key={t.key} categoryID={this.props.ID}
                            Summ={t.summary}
                            DueTime={t.due_Date}
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