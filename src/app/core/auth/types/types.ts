export type TokenResponse = {
    access_token: string;
    expires_in: number;
}

export type CodeExchangeRequest = {
    code: string;
    codeVerifier: string;
}