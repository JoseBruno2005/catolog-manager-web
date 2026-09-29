import { Routes } from "@angular/router";

export const publicRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../home/home.component').then(
            (m) => m.HomeComponent
        )
    },{
        path: 'register',
        loadComponent: () => import('../register/register.component').then(
            (m) => m.RegisterComponent
        )
    }
]