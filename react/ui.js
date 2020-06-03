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
    const formRef = React.useRef();
    const [response, setResponse] = React.useState(
        {
            success: null,
            error: ''
        }
    );
    const [inputs, setInputsError] = React.useState(
        {
            formError: '', 
            nameError:'', 
            emailError:'', 
            passwordError:'', 
            checkErrors: [1, 1, 1]
        }
    );

    const validateInput = (e) => {
        let inputValue = e.target.value;
        let inputField = e.target.id;

        if (inputField === 'name'){
            if (!/^[a-zA-Z ]+$/.test(inputValue) || inputValue.trim().length < 2 || inputValue.trim().length > 50){
                inputs.checkErrors[0] = 1;
                setInputsError(inputs => ({ ...inputs, nameError: 'Your name is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[0] = 0;
                setInputsError(inputs => ({ ...inputs, nameError: '', checkErrors: inputs.checkErrors }));
            }
        } else if (inputField === 'email'){
            if (!/\S+@\S+\.\S+/.test(inputValue)){
                inputs.checkErrors[1] = 1;
                setInputsError(inputs => ({ ...inputs, emailError: 'Your email is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[1] = 0;
                setInputsError(inputs => ({ ...inputs, emailError: '', checkErrors: inputs.checkErrors }));
            }
        } else if (inputField === 'pwd'){
            if (inputField.trim().length > 20 || inputValue.trim().length < 3){
                inputs.checkErrors[2] = 1;
                setInputsError(inputs => ({ ...inputs, passwordError: 'Your password is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[2] = 0;
                setInputsError(inputs => ({ ...inputs, passwordError: '', checkErrors: inputs.checkErrors }));
            }
        } else if (inputField === 'vpwd'){
            if (inputValue !== passwordRef.current.value){
                inputs.checkErrors[2] = 1;
                setInputsError(inputs => ({ ...inputs, passwordError: 'Your password is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[2] = 0;
                setInputsError(inputs => ({ ...inputs, passwordError: '', checkErrors: inputs.checkErrors }));
            }
        }
    }
    const submitForm = (e) => {
        e.preventDefault();
        if (!inputs.checkErrors.includes(1)){
            postData('http://localhost:3000/sign-up', formRef, setResponse);
        } else {
            setInputsError(inputs => ({ ...inputs, formError: 'Please fill the form completely' }));
        }
    }
    if (response.success === null){
        return (
            <div className="sbox">
                <div className="ftitle">Sign Up</div>
                <div className="error">{inputs.formError}</div>
                <div className="error">{response.error}</div>
                <form ref={formRef} onSubmit={submitForm}>
                    <div className="form-group">
                        <label for="name">Your Name:</label>
                        <div className="error">{inputs.nameError}</div>
                        <input type="text" name="name" className="form-control" placeHolder="Enter name" id="name" onBlur={validateInput} />
                    </div>
                    <div className="form-group">
                        <label for="email">Email address:</label>
                        <div className="error">{inputs.emailError}</div>
                        <input type="email" name="email" className="form-control" placeHolder="Enter email" id="email" onBlur={validateInput} />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <div className="error">{inputs.passwordError}</div>
                        <input type="password" name="password" className="form-control" placeHolder="Enter password" id="pwd" ref={passwordRef} onBlur={validateInput} />
                    </div>
                    <div className="form-group">
                        <label for="vpwd">Password:</label>
                        <input type="password" name="verifyPassword" className="form-control" placeHolder="Enter password" id="vpwd" onBlur={validateInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="alert alert-success">
                <strong>Success!</strong> {response.success}
            </div>
        );
    }
}

function VerifyEmail(){
    return (
        <div className="alert alert-success">
            <strong>Success!</strong> Your email has been verified. Click <a href="/login" className="alert-link">here</a> to login.
        </div>
    );
}

function Login(){
    const formRef = React.useRef();
    const [response, setResponse] = React.useState(
        {
            success: null,
            error: ''
        }
    );
    const [inputs, setInputsError] = React.useState(
        {
            formError: '',
            emailError: '',
            passwordError: '',
            checkErrors: [1, 1]
        }
    );

    const validateInput = (e) => {
        let inputValue = e.target.value;
        let inputField = e.target.id;

        if (inputField === 'email'){
            if (!/\S+@\S+\.\S+/.test(inputValue)) {
                inputs.checkErrors[0] = 1;
                setInputsError(inputs => ({ ...inputs, emailError: 'Your email is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[0] = 0;
                setInputsError(inputs => ({ ...inputs, emailError: '', checkErrors: inputs.checkErrors }));
            }
        } else if (inputField === 'pwd') {
            if (inputField.trim().length > 20 || inputValue.trim().length < 3) {
                inputs.checkErrors[1] = 1;
                setInputsError(inputs => ({ ...inputs, passwordError: 'Your password is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[1] = 0;
                setInputsError(inputs => ({ ...inputs, passwordError: '', checkErrors: inputs.checkErrors }));
            }
        }
    }
    const submitForm = (e) => {
        e.preventDefault();
        if (!inputs.checkErrors.includes(1)) {
            postData('http://localhost:3000/login', formRef, setResponse);
        } else {
            setInputsError(inputs => ({ ...inputs, formError: 'Please fill the form completely' }));
        }
    }
    if (response.success === null){
        return (
            <div className="sbox">
                <div className="ftitle">Login</div>
                <form ref={formRef} onSubmit={submitForm}>
                    <div className="error">{inputs.formError}</div>
                    <div className="error">{inputs.emailError}</div>
                    <div className="error">{inputs.passwordError}</div>
                    <div className="error">{response.error}</div>
                    <div className="form-group">
                        <label for="email">Email address:</label>
                        <input type="email" className="form-control" name="email" placeHolder="Enter email" id="email" onBlur={validateInput} />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" name="password" placeHolder="Enter password" id="pwd" onBlur={validateInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="alert alert-success">
                <strong>Success!</strong> {response.success}
            </div>
        );
    }
}

function postData(url, formRef, setResponse){
    fetch(
        url,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(new FormData(formRef.current))
        }
    ).then(
        response => response.json()
    ).then(
        data => {
            if ("success" in data) {
                setResponse(response => ({ ...response, success: data.success }));
            } else if ("error" in data) {
                setResponse(response => ({ ...response, error: data.error }));
            } else {
                setResponse(response => ({ ...response, error: "An error was encountered" }));
            }
        }
    ).catch(
        error => {
            setResponse(response => ({ ...response, error: "An error was encountered" }));
        }
    );
}

ReactDOM.render(<App />, document.getElementById('root'));