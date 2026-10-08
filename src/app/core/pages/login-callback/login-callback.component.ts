import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "../../auth/services/login.service";

@Component({
    selector: 'app-login-callback',
    imports: [],
    templateUrl: './login-callback.component.html',
    styleUrl: './login-callback.component.scss',
})
export class LoginCallbackComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly loginService = inject(LoginService);

    ngOnInit(): void {
        const code = this.route.snapshot.queryParamMap.get('code');
        const state = this.route.snapshot.queryParamMap.get('state');
        this.loginService.exchangeCodeForToken(code, state);
    }
}