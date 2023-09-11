import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    };
    if (!authState) {
        return (_jsx("div", { children: "hello world" }));
    }
    return authState.isAuthenticated ?
        _jsx(Navigate, { to: { pathname: '/' } })
        :
            _jsxs("div", { children: [_jsx(OktaSignInWidget, { config: config, onSuccess: onSuccess, onError: onError }), ";"] });
};
export default LoginWidget;
