import { Routes } from "@angular/router";
import { blockRegisterGuard } from "../../../shared/guards/block-register.guard";

export const publicRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../home/home.component').then(
            (m) => m.HomeComponent
        )
    },{
        path: 'register',
        canActivate: [blockRegisterGuard],
        loadComponent: () => import('../register/register.component').then(
            (m) => m.RegisterComponent
        )
    }
]