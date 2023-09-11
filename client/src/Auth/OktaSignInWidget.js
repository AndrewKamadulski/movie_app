import { jsx as _jsx } from "react/jsx-runtime";
import OktaSignIn from "@okta/okta-signin-widget";
import { useEffect, useRef } from "react";
import { oktaConfig } from '../lib/oktaconfig';
const OktaSignInWidget = ({ onSuccess, onError }) => {
    const widgetRef = useRef();
    useEffect(() => {
        if (!widgetRef.current) {
            return false;
        }
        const widget = new OktaSignIn(oktaConfig);
        widget.showSignInToGetTokens({
            el: widgetRef.current,
        }).then(onSuccess).catch(onError);
        return () => widget.remove();
    }, [onSuccess, onError]);
    return (_jsx("div", { className: "my-5", children: _jsx("div", { ref: widgetRef }) }));
};
export default OktaSignInWidget;
