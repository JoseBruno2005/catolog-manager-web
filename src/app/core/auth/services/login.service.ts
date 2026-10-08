import { inject, Injectable } from "@angular/core";
import { LoadingService } from "../../../shared/services/loading/loading.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, finalize, Observable, of, share, tap } from "rxjs";
import { CodeExchangeRequest, TokenResponse } from "../types/types";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly loadingService = inject(LoadingService);
    private readonly router = inject(Router);
    private readonly http = inject(HttpClient);
    private readonly tokenStorageService = inject(TokenStorageService);
    private refresh$: Observable<TokenResponse> | null = null;

    public exchangeCodeForToken(code: string | null, state: string | null): void {
        this.loadingService.show();

        if(!code || !state ||  state !== sessionStorage.getItem('state')
        ) {
            this.handleError("Parâmetros de autenticação inválidos ou sessão expirada.");
            return;
        }

        sessionStorage.removeItem('state');

        const codeVerifier = sessionStorage.getItem('code_verifier');
        if (!codeVerifier) {
            this.handleError("Código de verificação não encontrado na sessão.");
            return;
        }

        const body: CodeExchangeRequest = {
            code: code,
            codeVerifier: codeVerifier
        }

        this.http.post<TokenResponse>(environment.tokenUrl, body, 
            {   
                withCredentials: true
            }
        ).pipe(
            finalize(() => this.loadingService.hide())
        ).subscribe({
            next: (response: TokenResponse) => {
                sessionStorage.removeItem('code_verifier');
                this.tokenStorageService.setToken(response.access_token);
                this.router.navigate(['/']);
            },
            error: (error) => {
                console.error('Erro ao trocar o código pelo token:', error);
                this.handleError('Falha na comunicação com o servidor de autenticação.');
            }
        });
    }

    public refreshToken(): Observable<TokenResponse> {
        if(!this.refresh$) {
            this.refresh$ = this.http.post<TokenResponse>(
                environment.refreshTokenUrl, {}, {
                    headers: { "X-Requested-With": "true" },
                    withCredentials: true,
                }).pipe(
                    tap((response: TokenResponse) => {
                        this.tokenStorageService.setToken(response.access_token);
                    }),
                    finalize(() => {
                        this.refresh$ = null;
                    }),
                    share()
                );
            }
        return this.refresh$;
    }

    public logout(): Observable<void> {
        return this.http.post<void>(environment.logoutUrl, {}, { 
            headers: { "X-Requested-With": "true" },
            withCredentials: true,
        }).pipe(
            catchError((error) => {
                console.error('Erro ao fazer logout:', error);
                return of(undefined);
            }),
            tap(() => {
                this.tokenStorageService.clearToken();
                this.router.navigate(['/']);
            }
        ));
    }

    private handleError(message: string): void {
        console.error(message);
        sessionStorage.removeItem('code_verifier');
        sessionStorage.removeItem('state');
        this.loadingService.hide();
        this.router.navigate(['/']);
    }
}
