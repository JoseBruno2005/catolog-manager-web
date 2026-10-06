import { Routes } from '@angular/router';
import { publicRoutes } from './domain/public/routes/public.routes';

export const routes: Routes = [
    {
        path: 'callback',
        loadComponent: () => import('../app/core/pages/login-callback/login-callback.component').then(
            (m) => m.LoginCallbackComponent
        )
    },
    ...publicRoutes,
];
