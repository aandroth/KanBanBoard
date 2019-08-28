import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import signup from '../src/Signup/Signup';
import dashboard from '../src/Dashboard/Dashboard';
import projectView from '../src/ProjectView/ProjectView';
import addprojecttask from '../src/AddProjectTask/AddProjectTask';
import updateprojecttask from '../src/AddProjectTask/UpdateProjectTask';
import addproject from '../src/AddProject/AddProject';
import updateproject from '../src/AddProject/UpdateProject';
import { initFn } from './Redux/Actions';
import { connect } from 'react-redux';

const Home = () => {
    return (
        <div>
            <Link to="/signup">Signup</Link><br/>
            <Link to="/dashboard">Dashboard</Link><br />
            <Link to="/projectview">ProjectView</Link><br />
            <Link to="/addprojecttask">AddProjectTask</Link><br />
            <Link to="/updateprojecttask">UpdateProjectTask</Link><br />
            <Link to="/addproject">AddProject</Link><br />
            <Link to="/updateproject">UpdateProject</Link><br />
        </div>
    );
};

class App extends React.Component {

    componentDidMount() {
        this.props.initFn();
    }

    render() {
        return (
            <div>
                <div className="App-header">My Kanban Board!</div>
                <Router basename="/">
                    <div>
                        <Route path="/" exact component={Home} />
                        <Route path="/signup" component={signup} />
                        <Route path="/dashboard" component={dashboard} />
                        <Route path="/projectview" component={projectView} />
                        <Route path="/addprojecttask" component={addprojecttask} />
                        <Route path="/updateprojecttask"component={updateprojecttask} />
                        <Route path="/addproject" component={addproject} />
                        <Route path="/updateproject" component={updateproject} />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapDispatchToProps = {
    initFn,
}

export default connect(
    null,
    mapDispatchToProps
)(App)
