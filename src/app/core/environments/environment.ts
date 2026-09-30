const apiUrl = 'http://localhost:8080';

export const environment = {
    production: true,
    apiUrl: apiUrl,
    clientId: 'angular-catalog-manager',
    redirectUri: 'http://localhost:4200/callback',
    scope: [
        'products:read',
        'products:write',
    ],
    authorizeUrl: `${apiUrl}/oauth2/authorize`,
    tokenUrl: `${apiUrl}/oauth2/token`,
};
