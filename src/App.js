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
import { initFn, login } from './Redux/Actions';
import { connect } from 'react-redux';
import { loginAndGetUserFromDB } from './ServerSide/ServerFunctions';

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
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.initFn();

        document.cookie = "username=A@A;"; // Add expiration date
        let userEmailString = document.cookie.split(';')[0];
        console.log("cookie userEmailString: "+userEmailString);
        let userEmail = userEmailString.split('=')[1];
        console.log("cookie userEmail: " +userEmail);
        //if(userEmail != "")
        //    loginAndGetUserFromDBIfLoggedIn(userEmail);
        if (userEmail != "") {
            console.log("Attempting to login with user email");
            this.verifyLogin(userEmail, "a", history);
        }
    }

    verifyLogin = async (_email, _password, history) => {

        console.log("Logging in with email " + _email + " and password " + _password);

        try {
            let userData = await loginAndGetUserFromDB(_email, _password);

            if (userData.userEmail) {
                console.log("Successful login: ");
                console.log(userData);
                this.props.dispatch(login(userData.userName, userData.userEmail, userData.id, userData.projList));
                history.push("dashboard");
                console.log("Logged in with user email cookie!");
            }
            else {
                console.log("Failed login: ");
            }
        }
        catch (error) {
            console.log("Failed login: ");
        }
    }

    render() {

        if (!this.props.logged_in) {
            let page = window.location.href.split('/').pop();
            if (page != "" || page != "loginpage" || page != "signup")
                console.log("User is not logged in: " + page);
            else
                console.log("User is at entry point: " + page);
        }

        console.log("name of user: "+this.props.user.name);
        return (
            <div style={{ minHeight: "1000px", height: window.height }}>
                <Router basename="/">
                    <div className="App-header">
                        My Kanban Board!
                        <Link to="/"><button className="LogoutButton" onClick={this.props.initFn()}>Logout</button></Link>
                        <p style={{ position: "absolute", right: "20px" }}>{this.props.user.name}</p>
                    </div>
                    <div style={{ backgroundColor: "darkgrey", minHeight: "1000px", height: "100%" }}>
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
    loggin_in: state.reducerFn.loggin_in,
})

const mapDispatchToProps = {
    initFn,
    login,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
