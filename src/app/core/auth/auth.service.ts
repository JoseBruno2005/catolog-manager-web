import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
        const state = this.generateRandomString();
        const verifier = this.generateRandomBase64Url();
        this.generateCodeChallenge(verifier).then(challenge => {
            console.log(verifier);
            console.log(challenge);
            console.log(state)
            console.log(environment.scope.toString().replace(',', ' '))
        });
    }

    private bytesToBase64Url(bytes: Uint8Array): string {
        const base64String = btoa(String.fromCharCode(...bytes));
        return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    private generateRandomString(): string {
        return crypto.randomUUID();
    }

    private generateRandomBase64Url(): string {
        const randomBytes = new Uint8Array(32);
        return this.bytesToBase64Url(crypto.getRandomValues(randomBytes));
    }

    private async generateCodeChallenge(verifier: string): Promise<string> {
        const bytes = new TextEncoder().encode(verifier);
        const hash = await crypto.subtle.digest('SHA-256', bytes);
        return this.bytesToBase64Url(new Uint8Array(hash));
    }

    public async login() {
        const verifier = this.generateRandomString();
        const challenge = await this.generateCodeChallenge(verifier);
        const state = this.generateRandomBase64Url();

        sessionStorage.setItem('code_verifier', verifier);
        sessionStorage.setItem('state', state);

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: environment.clientId,
            redirect_uri: environment.redirectUri,
            scope: environment.scope.toString().replace(',', ' '),
            state: state,
            code_challenge: challenge,
            code_challenge_method: 'S256'
        });

        const authUrl = `${environment.authorizeUrl}?${params.toString()}`;
        window.location.href = authUrl;
    }
}