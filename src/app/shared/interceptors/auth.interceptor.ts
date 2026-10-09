import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenStorageService } from "../../core/auth/services/token-storage.service";
import { environment } from "../../core/environments/environment";
import { LoginService } from "../../core/auth/services/login.service";
import { Router } from "@angular/router";
import { catchError, switchMap, throwError } from "rxjs";

const isMyApi = (url:string): boolean => 
    new URL(url, window.location.origin).origin === new URL(environment.apiUrl).origin;

const isAuthRoute = (url: string): boolean =>
    [environment.tokenUrl, environment.refreshTokenUrl, environment.logoutUrl]
    .some(authUrl => url.startsWith(authUrl));

const withToken = (req: HttpRequest<any>, token: string): HttpRequest<any> => 
    req.clone({setHeaders: {Authorization: `Bearer ${token}`}});

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const tokenService = inject(TokenStorageService);
    const loginService = inject(LoginService);
    const router = inject(Router);

    if(!isMyApi(req.url) || isAuthRoute(req.url)) {
        return next(req);
    }

    const token = tokenService.token();
    const request = token ? withToken(req, token) : req;

    return next(request).pipe(
        catchError((error: unknown) => {
            if(!(error instanceof HttpErrorResponse) || error.status !== 401) {
                return throwError(() => error);
            }

            console.log("Chegou no interceptor")
            return loginService.refreshToken().pipe(
                catchError((refreshError: unknown) => {
                    tokenService.clearToken();
                    router.navigate(['/'])
                    return throwError(() => refreshError);
                }),
                switchMap(response => next(withToken(req, response.access_token)))
            );
        })
    );
};