import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    private readonly _token = signal<string | null>(null);
    
    public readonly token = this._token.asReadonly();

    public isAuthenticated = computed(() => !!this._token());

    public setToken(token: string | null): void {
        this._token.set(token);
    }

    public clearToken(): void {
        this._token.set(null);
    }
}