import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenStorageService } from "../../core/auth/services/token-storage.service";

export const blockRegisterGuard: CanActivateFn = () => {
    const tokenService = inject(TokenStorageService);
    const router = inject(Router);

    return tokenService.isAuthenticated() ? router.createUrlTree(['/']) : true;
}