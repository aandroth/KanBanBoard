import React from 'react';
import './ProjectView.css'
import { Link } from 'react-router-dom';
import AddProjectTask from '../AddProjectTask/AddProjectTask';
import { connect } from 'react-redux';
import { addTask, deleteTask, initFn } from '../Redux/Actions';
import TaskList from './TaskList'

const fetchData = () => ({
        type: "GET_TASKS",
});


let ii = 0;
class ProjectView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("proj view mount");
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="dashboard"><button>Back to Dashboard</button></Link>
                    <Link to="/addprojecttask"><button>Create Task</button></Link>
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
    todoList: state.reducerFn.categories[0],
    inprList: state.reducerFn.categories[1],
    doneList: state.reducerFn.categories[2],
})

const mapDispatchToProps = {
    fetchData,
    initFn,
    deleteTask,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectView)
