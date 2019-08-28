import React from 'react';
import './ProjectView.css'
import { Link } from 'react-router-dom';
import AddProjectTask from '../AddProjectTask/AddProjectTask';
import { connect } from 'react-redux';
import { addTask, deleteTask, getTasks, initFn } from '../Redux/Actions';



const Task = ({ onClick, ID, title, categoryID }) => {

    let updateUrlStr = "updateprojecttask?c=" + categoryID + "&k=" + ID;

    return (
        <li className="task-list-item">
            <div>
                <p>{ID}</p>
                <p>Priority</p>
            </div>
            <div>
                <p>{title}</p>
                <Link to={updateUrlStr}><button>View/Update</button></Link>
                <button onClick={() => onClick(ID, categoryID)}>Delete</button>
            </div>
        </li>
    );
}

let myID;

class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        myID = this.props.ID;
    }

    render() {
        return (
            <div className="task-list">
                <div style={{ width: "100%", left: "50px", border: "solid blue 1px" }}>
                    <h1>{this.props.title}</h1>
                </div>
                <div style={{ width: "100%", textAlign: "right", right: "0px", border: "solid red 1px" }}>
                    <ul>
                        {this.props.tasks.map(t => <Task onClick={this.props.deleteTask} ID={t.key} title={t.title} key={t.key} categoryID={this.props.ID} />)}
                    </ul>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    initFn,
    deleteTask
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)