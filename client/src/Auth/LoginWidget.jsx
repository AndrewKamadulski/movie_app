import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';
import { Navigate } from 'react-router-dom';

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        console.log("success");
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('Sign in error: ', err);
    }

    if (!authState) {
        return (
           <div>hello world</div> 
        );
    }

    return authState.isAuthenticated ?
    <Navigate to={{ pathname: '/' }}/>
    :
    <div>
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;
    </div>
};


export default LoginWidget;