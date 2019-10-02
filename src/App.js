import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import signup from '../src/Signup/Signup';
import loginpage from '../src/Signup/Login';
import dashboard from '../src/Dashboard/Dashboard';
import projectView from '../src/ProjectView/ProjectView';
import addprojecttask from '../src/AddProjectTask/AddProjectTask';
import updateprojecttask from '../src/AddProjectTask/UpdateProjectTask';
import addproject from '../src/AddProject/AddProject';
import updateproject from '../src/AddProject/UpdateProject';
import axitest from '../src/ServerSide/AxiosTest.js';
import { initFn } from './Redux/Actions';
import { connect } from 'react-redux';

const Home = () => {
    return (
        <div>
            <Link to="/signup">Signup</Link><br />
            <Link to="/loginpage">Login</Link><br />
            <Link to="/dashboard">Dashboard</Link><br />
            <Link to="/projectview">ProjectView</Link><br />
            <Link to="/addprojecttask">AddProjectTask</Link><br />
            <Link to="/updateprojecttask">UpdateProjectTask</Link><br />
            <Link to="/addproject">AddProject</Link><br />
            <Link to="/updateproject">UpdateProject</Link><br />
            <Link to="/con">Conversion</Link><br />
            <Link to="/axitest">Axios Test</Link><br />
        </div>
    );
};

class App extends React.Component {

    componentDidMount() {
        this.props.initFn();
    }

    // Code to check that the user is logged in if on any other page than signup, login, home
    //verifyUserIsLoggedIn() {
    //    if (this.props.user.idx == -1) {
    //        document.URL
    //    }
    //}

    render() {
        console.log("name of user: "+this.props.user.name);
        return (
            <div>
                <Router basename="/">
                    <div className="App-header">
                        My Kanban Board!
                        <Link to="/">Logout</Link>
                        <p style={{ position: "absolute", right: "0px" }}>{this.props.user.name}</p>
                    </div>
                    <div>
                        <Route path="/" exact component={Home} />
                        <Route path="/signup" component={signup} />
                        <Route path="/loginpage" component={loginpage} />
                        <Route path="/dashboard" component={dashboard} />
                        <Route path="/projectview" component={projectView} />
                        <Route path="/addprojecttask" component={addprojecttask} />
                        <Route path="/updateprojecttask"component={updateprojecttask} />
                        <Route path="/addproject" component={addproject} />
                        <Route path="/updateproject" component={updateproject} />
                        <Route path="/axitest" component={axitest} />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.reducerFn.active_user,
})

const mapDispatchToProps = {
    initFn,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
