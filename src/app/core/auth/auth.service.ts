import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
        const verifier = this.generateRandomBase64Url();
        this.generateCodeChallenge(verifier).then(challenge => {
            console.log(verifier);
            console.log(challenge);
        });
    }

    private bytesToBase64Url(bytes: Uint8Array): string {
        const base64String = btoa(String.fromCharCode(...bytes));
        return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
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
}