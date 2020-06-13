import postData from './postData';

export default function Login(props) {
    
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

        if (inputField === 'email') {
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
            postData('http://localhost:3000/login', new FormData(formRef.current), setResponse);
        } else {
            setInputsError(inputs => ({ ...inputs, formError: 'Please fill the form completely' }));
        }
    }

    if (response.success === null) {
        return (
            <div className="sbox">
                <div className="ftitle">Login</div>
                <div className="leftoption" onClick={() => props.goTo("sign-up")}>Sign Up</div>
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