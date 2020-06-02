'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var pathName = location.pathname.split('/')[1];

var pages = {
    "sign-up": SignUp,
    "verify-email": VerifyEmail,
    "login": Login
};

function App() {
    var Page = pages[pathName];
    return React.createElement(Page, null);
}

function SignUp() {
    var passwordRef = React.useRef();

    var _React$useState = React.useState({ nameError: '', emailError: '', passwordError: '' }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        inputs = _React$useState2[0],
        setInputsError = _React$useState2[1];

    var validateInput = function validateInput(e) {
        var inputValue = e.target.value;
        var inputField = e.target.id;

        if (inputField === 'name' && (!/^[a-zA-Z ]+$/.test(inputValue) || inputValue.trim().length < 2 || inputValue.trim().length > 50)) {
            setInputsError(function (inputs) {
                return Object.assign({}, inputs, { nameError: 'Your name is invalid' });
            });
        } else if (inputField === 'email' && !/\S+@\S+\.\S+/.test(inputValue)) {
            setInputsError(function (inputs) {
                return Object.assign({}, inputs, { emailError: 'Your email is invalid' });
            });
        } else if (inputField === 'pwd' && (inputField.trim().length > 20 || inputValue.trim().length < 3)) {
            setInputsError(function (inputs) {
                return Object.assign({}, inputs, { passwordError: 'Your password is invalid' });
            });
        } else if (inputField === 'vpwd' && inputValue !== passwordRef.current.value) {
            setInputsError(function (inputs) {
                return Object.assign({}, inputs, { passwordError: 'Your password is invalid' });
            });
        }
    };
    var submitForm = function submitForm(e) {
        e.preventDefault();
    };
    return React.createElement(
        'div',
        { className: 'sbox' },
        React.createElement(
            'div',
            { className: 'ftitle' },
            'Sign Up'
        ),
        React.createElement(
            'form',
            { onSubmit: submitForm },
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { 'for': 'name' },
                    'Your Name:'
                ),
                inputs.nameError,
                React.createElement('input', { type: 'text', className: 'form-control', placeHolder: 'Enter name', id: 'name', onBlur: validateInput })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { 'for': 'email' },
                    'Email address:'
                ),
                inputs.emailError,
                React.createElement('input', { type: 'email', className: 'form-control', placeHolder: 'Enter email', id: 'email', onBlur: validateInput })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { 'for': 'pwd' },
                    'Password:'
                ),
                inputs.passwordError,
                React.createElement('input', { type: 'password', className: 'form-control', placeHolder: 'Enter password', id: 'pwd', ref: passwordRef, onBlur: validateInput })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { 'for': 'vpwd' },
                    'Password:'
                ),
                React.createElement('input', { type: 'password', className: 'form-control', placeHolder: 'Enter password', id: 'vpwd', onBlur: validateInput })
            ),
            React.createElement(
                'button',
                { type: 'submit', className: 'btn btn-primary' },
                'Login'
            )
        )
    );
}

function VerifyEmail() {
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
            'a',
            { href: '/login', className: 'alert-link' },
            'here'
        ),
        ' to login.'
    );
}

function Login() {
    return React.createElement(
        'div',
        { className: 'sbox' },
        React.createElement(
            'div',
            { className: 'ftitle' },
            'Login'
        ),
        React.createElement(
            'form',
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { 'for': 'email' },
                    'Email address:'
                ),
                React.createElement('input', { type: 'email', className: 'form-control', placeHolder: 'Enter email', id: 'email' })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { 'for': 'pwd' },
                    'Password:'
                ),
                React.createElement('input', { type: 'password', className: 'form-control', placeHolder: 'Enter password', id: 'pwd' })
            ),
            React.createElement(
                'button',
                { type: 'submit', className: 'btn btn-primary' },
                'Login'
            )
        )
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));