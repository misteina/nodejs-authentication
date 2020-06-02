'use strict';

const pathName = location.pathname.split('/')[1];

const pages = {
    "sign-up": SignUp,
    "verify-email": VerifyEmail,
    "login": Login
};

function App(){
    const Page = pages[pathName];
    return <Page />;
}

function SignUp(){
    const passwordRef = React.useRef();
    const [inputs, setInputsError] = React.useState({nameError:'', emailError:'', passwordError:''});

    const validateInput = (e) => {
        let inputValue = e.target.value;
        let inputField = e.target.id;

        if (inputField === 'name' && (!/^[a-zA-Z ]+$/.test(inputValue) || inputValue.trim().length < 2 || inputValue.trim().length > 50)){
            setInputsError(inputs => ({ ...inputs, nameError: 'Your name is invalid' }));
        } else if (inputField === 'email' && !/\S+@\S+\.\S+/.test(inputValue)){
            setInputsError(inputs => ({ ...inputs, emailError: 'Your email is invalid' }));
        } else if (inputField === 'pwd' && (inputField.trim().length > 20 || inputValue.trim().length < 3)){
            setInputsError(inputs => ({ ...inputs, passwordError: 'Your password is invalid' }));
        } else if (inputField === 'vpwd' && inputValue !== passwordRef.current.value){
            setInputsError(inputs => ({ ...inputs, passwordError: 'Your password is invalid' }));
        }
    }
    const submitForm = (e) => {
        e.preventDefault();

    }
    return (
        <div className="sbox">
            <div className="ftitle">Sign Up</div>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label for="name">Your Name:</label>
                    {inputs.nameError}
                    <input type="text" className="form-control" placeHolder="Enter name" id="name" onBlur={validateInput} />
                </div>
                <div className="form-group">
                    <label for="email">Email address:</label>
                    {inputs.emailError}
                    <input type="email" className="form-control" placeHolder="Enter email" id="email" onBlur={validateInput} />
                </div>
                <div className="form-group">
                    <label for="pwd">Password:</label>
                    {inputs.passwordError}
                    <input type="password" className="form-control" placeHolder="Enter password" id="pwd" ref={passwordRef} onBlur={validateInput} />
                </div>
                <div className="form-group">
                    <label for="vpwd">Password:</label>
                    <input type="password" className="form-control" placeHolder="Enter password" id="vpwd" onBlur={validateInput} />
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
            <div className="ftitle">Login</div>
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