export const oktaConfig = {
    clientId: '0oaasg45a5c690YSm5d7',
    issuer: 'https://dev-71079476.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'], 
    pkce: true,
    disableHttpsCheck: true,
    useInteractionCodeFlow: false,
    useClassicEngine: true,
}