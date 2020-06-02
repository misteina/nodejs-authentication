'use strict';

const components = {
    "sign-up": SignUp,
    "verify-email": VerifyEmail,
    "login": Login
};

function App(){
    return <span>Hello there!</span>
}

function SignUp(){
    return (
        <div className="sbox">
            <div className="ftitle">Sign Up</div>
            <form>
                <div className="form-group">
                    <label for="name">Your Name:</label>
                    <input type="text" className="form-control" placeHolder="Enter name" id="name" />
                </div>
                <div className="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" className="form-control" placeHolder="Enter email" id="email" />
                </div>
                <div className="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" className="form-control" placeHolder="Enter password" id="pwd" />
                </div>
                <div className="form-group">
                    <label for="vpwd">Password:</label>
                    <input type="password" className="form-control" placeHolder="Enter password" id="vpwd" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

function VerifyEmail(){
    return (
        <div className="alert alert-success">
            <strong>Success!</strong> Your email has been verified. Click <a href="/login" className="alert-link">here</a> to login.
        </div>
    );
}

function Login(){
    return (
        <div className="sbox">
            <div className="ftitle">Sign In</div>
            <form>
                <div className="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" className="form-control" placeHolder="Enter email" id="email"/>
                </div>
                <div className="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" className="form-control" placeHolder="Enter password" id="pwd" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));