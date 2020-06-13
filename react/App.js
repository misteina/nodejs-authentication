'use strict';

import SignUp from './SignUp';
import Login from './LogIn';
import VerifyEmail from './VerifyEmail';


function App() {
    const pathName = location.pathname.split('/')[1];
    const [currentPage, setCurrentPage] = React.useState(pathName);

    if (pathName !== currentPage) {
        setCurrentPage(pathName)
    }

    const pages = {
        "sign-up": SignUp,
        "verify-email": VerifyEmail,
        "login": Login
    };
    const navigate = (link) => {
        setCurrentPage(link);
        history.pushState({}, null, 'http://localhost:3000/' + link);
    }
    if (currentPage in pages) {
        const Page = pages[currentPage];
        return <Page goTo={navigate} />;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('popstate', (event) => {
    ReactDOM.render(<App />, document.getElementById('root'));
});