import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { login, signup } from '../Redux/Actions';
import { loginAndGetUserFromDB } from '../ServerSide/ServerFunctions';
import './Signup.css'

const InputField = (props) => {
    return (
        <input id={props.ID} className="formInput" type={props.type} name={props.name} placeholder={props.placeholder} />
    )
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userEmail: "",
        }
    }

    componentDidMount() {
    }

    createUser = (data) => {
        console.log("Creating user: " + this.state.data.userName);
        this.props.dispatch(signup(this.state.data.userName,
            this.state.data.userEmail,
            this.state.data.userPass));
    }

    verifyLogin = async (_email, _password, history) => {


        console.log("Logging in with email " + _email + " and password " + _password);

        let userData = await loginAndGetUserFromDB(_email, _password);

        if (userData.userEmail) {
            console.log("Successful login: ");
            console.log(userData);
            this.props.dispatch(login(userData.userName, userData.userEmail, userData.id, userData.projList));
            history.push("dashboard");
        }
        else {
            console.log("Failed login: ");
        }
    }

    render() {
        return (
            <div>
                <br />
                <Route render={({ history }) => (
                    <form
                        className="Column-Form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            let _email = document.getElementById("email").value;
                            if (!_email.trim()) {
                                alert("Bad entry!");
                                return;
                            }
                            let _password = document.getElementById("password").value;
                            if (!_password.trim()) {
                                alert("Bad entry!");
                                return;
                            }
                            console.log("Logging in with email " + _email + " and password " + _password);
                            this.verifyLogin(_email, _password, history);

                        }}>
                        <InputField ID="email" type="text" placeholder="Email" />
                        <br />
                        <InputField ID="password" type="password" placeholder="Password" />
                        <br />
                        <input type="submit" value="Submit" />
                        <Link to=""><button>Cancel</button></Link>
                    </form>
                )} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user_list: state.reducerFn.user_list,
})

export default connect(
    mapStateToProps,
    null
)(Login)