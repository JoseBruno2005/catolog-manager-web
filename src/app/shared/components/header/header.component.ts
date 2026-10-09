import { Component, computed, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/auth/services/auth.service";
import { TokenStorageService } from "../../../core/auth/services/token-storage.service";
import { ButtonModule } from "primeng/button";
import { LoginService } from "../../../core/auth/services/login.service";
import { InputComponent } from "../input/input.component";
import { MenuModule } from "primeng/menu";
import { MenuItem } from "primeng/api";

@Component({
    selector: 'app-header',
    imports: [
        ButtonModule,
        MenuModule,
        InputComponent,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class headerComponent {
    private readonly Router = inject(Router);
    private readonly authService = inject(AuthService);
    private readonly loginService = inject(LoginService);
    private readonly tokenStorageService = inject(TokenStorageService);

    readonly isAutheticated = this.tokenStorageService.isAuthenticated;


    login() {
        this.authService.login();
    }

    register() {
        this.Router.navigate(['/register']);
    }

    logout() {
        this.loginService.logout().subscribe();
    }

    readonly menuItems = computed<MenuItem[]>(() =>
        this.isAutheticated() 
        ?  [
            {label: '', icon: 'pi pi-sign-out'},
            {label: 'Sair', icon: 'pi pi-sign-out', command: () => this.logout()},
        ] : [
            {label: 'Entrar', command: () => this.login()},
            {label: 'Cadastrar', command: () => this.register()},
        ]
    )
}