import React from 'react';
import './Signup.css'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { signup } from '../Redux/Actions';
import { saveEntityToDB } from '../ServerSide/ServerFunctions';

const InputField = (props) => {
    return (
        <input id={props.ID} className="formInput" type={props.type} name={props.name} placeholder={props.placeholder} />
    )
}

class SignupPage extends React.Component {

    emailDoesNotExist(_email) {
        for (let ii = 0; ii < this.props.user_list.length; ++ii) {
            console.log("looking at user email " + this.props.user_list[ii].email);
            if (this.props.user_list[ii].email === _email) { // Found email
                console.log("User " + this.props.user_list[ii].name + " with email " + _email + " already exists!");
                return false;
            }
        }
        return true;
    }

    verifySignup = async (_email, _name, _password, history) => {

        console.log("Signing up with email " + _email + ", name " + _name + " and password " + _password);

        let userId = 0;
        userId = await saveEntityToDB('user', { userEmail: _email, userName: _name, userPass: _password });

        if (userId > 0) {
            console.log("Successful signup: ");
            console.log(userId);
            history.push("loginpage");
        }
        else {
            console.log("Failed signup");
        }
    }

    render() {
        return (
            <div className="login-signup-body">
                <Route render={({ history }) => (
                    <form
                        className="Column-Form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            let _name = document.getElementById("name").value;
                            if (!_name.trim()) {
                                alert("Bad entry!");
                                return;
                            }
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
                            let _confirm_password = document.getElementById("confirm_password").value;
                            if (!_confirm_password.trim()) {
                                alert("Bad entry!");
                                return;
                            }
                            if (_password === _confirm_password) {

                                this.verifySignup(_email, _name, _password, history);
                            }
                        }}>
                        <div className="login-signup">
                            <InputField ID="name" type="text" name="name" placeholder="Name" />
                        </div>
                        <div className="login-signup">
                            <InputField ID="email" type="text" placeholder="Email" />
                        </div>
                        <div className="login-signup">
                            <InputField ID="password" type="password" placeholder="Password" />
                        </div>
                        <div className="login-signup">
                            <InputField ID="confirm_password" type="password" placeholder="Confirm Password" />
                        </div>
                        <input type="submit" value="Submit" />
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
)(SignupPage)