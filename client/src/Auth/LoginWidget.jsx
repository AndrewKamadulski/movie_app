import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import OktaSignInWidget from "./OktaSignInWidget";

const LoginWidget = ({config}) => {
    const {oktaAuth, authState} = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (error) => {
        console.log('Sign in error: ', err);
        
    }
    if(!authState) {
        return (
            <div>
                Loading.......
            </div>
        );
    }

    return authState.isAuthenticated ? 
    <Redirect to={{pathname: '/'}} /> 
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>

export default LoginWidget;