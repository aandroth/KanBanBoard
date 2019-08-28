import React from 'react';
import './Signup.css'

const InputField = (props) => {
    return(
            <input className="formInput" type="text" name={props.name} placeholder={props.placeholder} />
    )
}

function signup() {
    return (
        <div>
            <form className="Column-Form">
                <InputField type="text" name="firstname" placeholder="Full Name" />
                <br/>
                <InputField type="text" placeholder="Email" />
                <br />
                <InputField type="text" placeholder="Password" />
                <br />
                <InputField type="text" placeholder="Confirm Password" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default signup;