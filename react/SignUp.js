import postData from './postData';

export default function SignUp(props) {
    
    const passwordRef = React.useRef();
    const formRef = React.useRef();
    const buttonRef = React.useRef();
    const [buttonStatus, setButtonStatus] = React.useState('Sign Up');
    const [response, setResponse] = React.useState(
        {
            success: null,
            error: ''
        }
    );
    const [inputs, setInputsError] = React.useState(
        {
            formError: '',
            nameError: '',
            emailError: '',
            passwordError: '',
            checkErrors: [1, 1, 1]
        }
    );

    const validateInput = (e) => {
        let inputValue = e.target.value;
        let inputField = e.target.id;

        if (inputField === 'name') {
            if (!/^[a-zA-Z ]+$/.test(inputValue) || inputValue.trim().length < 2 || inputValue.trim().length > 50) {
                inputs.checkErrors[0] = 1;
                setInputsError(inputs => ({ ...inputs, nameError: 'Your name is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[0] = 0;
                setInputsError(inputs => ({ ...inputs, nameError: '', checkErrors: inputs.checkErrors }));
            }
        } else if (inputField === 'email') {
            if (!/\S+@\S+\.\S+/.test(inputValue)) {
                inputs.checkErrors[1] = 1;
                setInputsError(inputs => ({ ...inputs, emailError: 'Your email is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[1] = 0;
                setInputsError(inputs => ({ ...inputs, emailError: '', checkErrors: inputs.checkErrors }));
            }
        } else if (inputField === 'pwd') {
            if (inputField.trim().length > 20 || inputValue.trim().length < 3) {
                inputs.checkErrors[2] = 1;
                setInputsError(inputs => ({ ...inputs, passwordError: 'Your password is invalid', checkErrors: inputs.checkErrors }));
            } else {
                inputs.checkErrors[2] = 0;
                setInputsError(inputs => ({ ...inputs, passwordError: '', checkErrors: inputs.checkErrors }));
            }
        } else if (inputField === 'vpwd') {
            if (inputValue !== passwordRef.current.value) {
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

        buttonRef.current.disabled = true;
        setButtonStatus('<span class="spinner-border spinner-border-sm"></span>&nbsp;Wait...');

        if (!inputs.checkErrors.includes(1)) {
            postData('http://localhost:3000/sign-up', new FormData(formRef.current), setResponse);
        } else {
            setInputsError(inputs => ({ ...inputs, formError: 'Please fill the form completely' }));
        }
    }
    if (response.success === null) {
        return (
            <div className="sbox">
                <div className="ftitle">Sign Up</div>
                <div className="leftoption" onClick={() => props.goTo("login")}>Login</div>
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
                    {/* dangerouslySetInnerHTML is safe in this use case  */}
                    <button type="submit" className="btn btn-primary" ref={buttonRef} dangerouslySetInnerHTML={{ __html: buttonStatus }} />
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