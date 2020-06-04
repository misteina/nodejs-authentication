'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var pathName = location.pathname.split('/')[1];

function App() {
    var _React$useState = React.useState(pathName),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        currentPage = _React$useState2[0],
        setCurrentPage = _React$useState2[1];

    var pages = {
        "sign-up": SignUp,
        "verify-email": VerifyEmail,
        "login": Login
    };

    var navigate = function navigate(link) {
        setCurrentPage(link);
        history.pushState({}, null, 'http://localhost:3000/' + link);
    };

    if (currentPage in pages) {
        var Page = pages[currentPage];
        return React.createElement(Page, { goTo: navigate });
    }
}

function SignUp(props) {
    var passwordRef = React.useRef();
    var formRef = React.useRef();
    var buttonRef = React.useRef();

    var _React$useState3 = React.useState('Sign Up'),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        buttonStatus = _React$useState4[0],
        setButtonStatus = _React$useState4[1];

    var _React$useState5 = React.useState({
        success: null,
        error: ''
    }),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        response = _React$useState6[0],
        setResponse = _React$useState6[1];

    var _React$useState7 = React.useState({
        formError: '',
        nameError: '',
        emailError: '',
        passwordError: '',
        checkErrors: [1, 1, 1]
    }),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        inputs = _React$useState8[0],
        setInputsError = _React$useState8[1];

    var validateInput = function validateInput(e) {
        var inputValue = e.target.value;
        var inputField = e.target.id;

        if (inputField === 'name') {
            if (!/^[a-zA-Z ]+$/.test(inputValue) || inputValue.trim().length < 2 || inputValue.trim().length > 50) {
                inputs.checkErrors[0] = 1;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { nameError: 'Your name is invalid', checkErrors: inputs.checkErrors });
                });
            } else {
                inputs.checkErrors[0] = 0;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { nameError: '', checkErrors: inputs.checkErrors });
                });
            }
        } else if (inputField === 'email') {
            if (!/\S+@\S+\.\S+/.test(inputValue)) {
                inputs.checkErrors[1] = 1;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { emailError: 'Your email is invalid', checkErrors: inputs.checkErrors });
                });
            } else {
                inputs.checkErrors[1] = 0;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { emailError: '', checkErrors: inputs.checkErrors });
                });
            }
        } else if (inputField === 'pwd') {
            if (inputField.trim().length > 20 || inputValue.trim().length < 3) {
                inputs.checkErrors[2] = 1;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { passwordError: 'Your password is invalid', checkErrors: inputs.checkErrors });
                });
            } else {
                inputs.checkErrors[2] = 0;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { passwordError: '', checkErrors: inputs.checkErrors });
                });
            }
        } else if (inputField === 'vpwd') {
            if (inputValue !== passwordRef.current.value) {
                inputs.checkErrors[2] = 1;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { passwordError: 'Your password is invalid', checkErrors: inputs.checkErrors });
                });
            } else {
                inputs.checkErrors[2] = 0;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { passwordError: '', checkErrors: inputs.checkErrors });
                });
            }
        }
    };
    var submitForm = function submitForm(e) {
        e.preventDefault();

        buttonRef.current.disabled = true;
        setButtonStatus('<span class="spinner-border spinner-border-sm"></span>&nbsp;Wait...');

        if (!inputs.checkErrors.includes(1)) {
            postData('http://localhost:3000/sign-up', new FormData(formRef.current), setResponse);
        } else {
            setInputsError(function (inputs) {
                return Object.assign({}, inputs, { formError: 'Please fill the form completely' });
            });
        }
    };
    if (response.success === null) {
        return React.createElement(
            'div',
            { className: 'sbox' },
            React.createElement(
                'div',
                { className: 'ftitle' },
                'Sign Up'
            ),
            React.createElement(
                'div',
                { className: 'leftoption', onClick: function onClick() {
                        return props.goTo("login");
                    } },
                'Login'
            ),
            React.createElement(
                'div',
                { className: 'error' },
                inputs.formError
            ),
            React.createElement(
                'div',
                { className: 'error' },
                response.error
            ),
            React.createElement(
                'form',
                { ref: formRef, onSubmit: submitForm },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { 'for': 'name' },
                        'Your Name:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'error' },
                        inputs.nameError
                    ),
                    React.createElement('input', { type: 'text', name: 'name', className: 'form-control', placeHolder: 'Enter name', id: 'name', onBlur: validateInput })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { 'for': 'email' },
                        'Email address:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'error' },
                        inputs.emailError
                    ),
                    React.createElement('input', { type: 'email', name: 'email', className: 'form-control', placeHolder: 'Enter email', id: 'email', onBlur: validateInput })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { 'for': 'pwd' },
                        'Password:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'error' },
                        inputs.passwordError
                    ),
                    React.createElement('input', { type: 'password', name: 'password', className: 'form-control', placeHolder: 'Enter password', id: 'pwd', ref: passwordRef, onBlur: validateInput })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { 'for': 'vpwd' },
                        'Password:'
                    ),
                    React.createElement('input', { type: 'password', name: 'verifyPassword', className: 'form-control', placeHolder: 'Enter password', id: 'vpwd', onBlur: validateInput })
                ),
                React.createElement('button', { type: 'submit', className: 'btn btn-primary', ref: buttonRef, dangerouslySetInnerHTML: { __html: buttonStatus } })
            )
        );
    } else {
        return React.createElement(
            'div',
            { className: 'alert alert-success' },
            React.createElement(
                'strong',
                null,
                'Success!'
            ),
            ' ',
            response.success
        );
    }
}

function VerifyEmail(props) {
    var token = location.pathname.split('/')[2];

    var _React$useState9 = React.useState({
        success: null,
        error: ''
    }),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        response = _React$useState10[0],
        setResponse = _React$useState10[1];

    if (typeof token !== 'undefined') {
        var formData = new FormData();
        formData.append('token', token);

        if (response.success === null && response.error.length === 0) {
            postData('http://localhost:3000/verify-email', formData, setResponse);
        }

        if (response.success !== null) {
            return React.createElement(
                'div',
                { className: 'alert alert-success' },
                React.createElement(
                    'strong',
                    null,
                    'Success!'
                ),
                ' Your email has been verified. Click ',
                React.createElement(
                    'span',
                    { onClick: function onClick() {
                            return props.goTo("login");
                        } },
                    'here'
                ),
                ' to login.'
            );
        } else if (response.error.length > 0) {
            return React.createElement(
                'div',
                { className: 'alert alert-danger' },
                React.createElement(
                    'strong',
                    null,
                    'Error!'
                ),
                ' ',
                response.error
            );
        }
        return null;
    } else {
        return React.createElement(
            'div',
            { className: 'alert alert-danger' },
            React.createElement(
                'strong',
                null,
                'Error!'
            ),
            ' Unauthourized action (100)'
        );
    }
}

function Login(props) {
    var formRef = React.useRef();

    var _React$useState11 = React.useState({
        success: null,
        error: ''
    }),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        response = _React$useState12[0],
        setResponse = _React$useState12[1];

    var _React$useState13 = React.useState({
        formError: '',
        emailError: '',
        passwordError: '',
        checkErrors: [1, 1]
    }),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        inputs = _React$useState14[0],
        setInputsError = _React$useState14[1];

    var validateInput = function validateInput(e) {
        var inputValue = e.target.value;
        var inputField = e.target.id;

        if (inputField === 'email') {
            if (!/\S+@\S+\.\S+/.test(inputValue)) {
                inputs.checkErrors[0] = 1;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { emailError: 'Your email is invalid', checkErrors: inputs.checkErrors });
                });
            } else {
                inputs.checkErrors[0] = 0;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { emailError: '', checkErrors: inputs.checkErrors });
                });
            }
        } else if (inputField === 'pwd') {
            if (inputField.trim().length > 20 || inputValue.trim().length < 3) {
                inputs.checkErrors[1] = 1;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { passwordError: 'Your password is invalid', checkErrors: inputs.checkErrors });
                });
            } else {
                inputs.checkErrors[1] = 0;
                setInputsError(function (inputs) {
                    return Object.assign({}, inputs, { passwordError: '', checkErrors: inputs.checkErrors });
                });
            }
        }
    };
    var submitForm = function submitForm(e) {
        e.preventDefault();
        if (!inputs.checkErrors.includes(1)) {
            postData('http://localhost:3000/login', new FormData(formRef.current), setResponse);
        } else {
            setInputsError(function (inputs) {
                return Object.assign({}, inputs, { formError: 'Please fill the form completely' });
            });
        }
    };

    if (response.success === null) {
        return React.createElement(
            'div',
            { className: 'sbox' },
            React.createElement(
                'div',
                { className: 'ftitle' },
                'Login'
            ),
            React.createElement(
                'div',
                { className: 'leftoption', onClick: function onClick() {
                        return props.goTo("sign-up");
                    } },
                'Sign Up'
            ),
            React.createElement(
                'form',
                { ref: formRef, onSubmit: submitForm },
                React.createElement(
                    'div',
                    { className: 'error' },
                    inputs.formError
                ),
                React.createElement(
                    'div',
                    { className: 'error' },
                    inputs.emailError
                ),
                React.createElement(
                    'div',
                    { className: 'error' },
                    inputs.passwordError
                ),
                React.createElement(
                    'div',
                    { className: 'error' },
                    response.error
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { 'for': 'email' },
                        'Email address:'
                    ),
                    React.createElement('input', { type: 'email', className: 'form-control', name: 'email', placeHolder: 'Enter email', id: 'email', onBlur: validateInput })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { 'for': 'pwd' },
                        'Password:'
                    ),
                    React.createElement('input', { type: 'password', className: 'form-control', name: 'password', placeHolder: 'Enter password', id: 'pwd', onBlur: validateInput })
                ),
                React.createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-primary' },
                    'Login'
                )
            )
        );
    } else {
        return React.createElement(
            'div',
            { className: 'alert alert-success' },
            React.createElement(
                'strong',
                null,
                'Success!'
            ),
            ' ',
            response.success
        );
    }
}

function postData(url, formData, setResponse) {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        },
        body: new URLSearchParams(formData)
    }).then(function (response) {
        try {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setResponse(function (response) {
                return Object.assign({}, response, { error: error });
            });
        }
    }).then(function (data) {
        if ("success" in data) {
            setResponse(function (response) {
                return Object.assign({}, response, { success: data.success });
            });
        } else if ("error" in data) {
            setResponse(function (response) {
                return Object.assign({}, response, { error: data.error });
            });
        } else {
            setResponse(function (response) {
                return Object.assign({}, response, { error: "An error was encountered (101)" });
            });
        }
    }).catch(function (error) {
        return setResponse(function (response) {
            return Object.assign({}, response, { error: "An error was encountered (102)" });
        });
    });
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));