import React from 'react';
import './ProjectView.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTask, initFn } from '../Redux/Actions';
import TaskList from './TaskList'


class ProjectView extends React.Component {

    componentDidMount() {
        console.log("proj view mount");
    }

    addTaskUrl = (userKey, projectKey) => {
        return "/addprojecttask?u=" + userKey + "&p=" + projectKey;
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="dashboard"><button>Back to Dashboard</button></Link>
                    <Link to={this.addTaskUrl(this.props.userKey, this.props.projKey)}><button>Create Task</button></Link>
                </div>
                <div style={{ float: "right", right: "0px", width: "50%", height: "300px", border: "solid green 2px" }}>
                    <TaskList title={"Todo"} tasks={this.props.todoList} ID={0} />
                    <TaskList title={"In Progress"} tasks={this.props.inprList} ID={1} />
                    <TaskList title={"Done"} tasks={this.props.doneList} ID={2} />
                </div>
            </div>
        );
    }
}
// Each category list item holds its own list of tasks
const mapStateToProps = (state) => ({
    userKey: state.reducerFn.active_user.key,
    projKey: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list[state.reducerFn.project_idx].key,
    todoList: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list[state.reducerFn.project_idx].categories[0],
    inprList: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list[state.reducerFn.project_idx].categories[1],
    doneList: state.reducerFn.user_list[state.reducerFn.active_user.idx].project_list[state.reducerFn.project_idx].categories[2],
})

const mapDispatchToProps = {
    initFn,
    deleteTask,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectView)
