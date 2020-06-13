import postData from './postData';

export default function VerifyEmail(props) {
    const token = location.pathname.split('/')[2];

    const [response, setResponse] = React.useState(
        {
            success: null,
            error: ''
        }
    );
    if (typeof token !== 'undefined') {
        let formData = new FormData();
        formData.append('token', token);

        if (response.success === null && response.error.length === 0) {
            postData('http://localhost:3000/verify-email', formData, setResponse);
        }

        if (response.success !== null) {
            return (
                <div className="alert alert-success">
                    <strong>Success!</strong> Your email has been verified. Click <span onClick={() => props.goTo("login")}>here</span> to login.
                </div>
            );
        } else if (response.error.length > 0) {
            return (
                <div className="alert alert-danger">
                    <strong>Error!</strong> {response.error}
                </div>
            );
        }
        return null;
    } else {
        return (
            <div className="alert alert-danger">
                <strong>Error!</strong> Unauthourized action (100)
            </div>
        );
    }
}