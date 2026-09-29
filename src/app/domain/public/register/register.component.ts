import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../../shared/services/user-service/user.service";
import { Router } from "@angular/router";
import { passwordMatchValidator } from "./utils/passwordMatch.validator";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RegisterUserRequest } from "../../../shared/services/user-service/type";
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: "app-register",
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        MessageModule,
        ToastModule,
    ],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss"
})
export class RegisterComponent {

    private readonly userService = inject(UserService);
    private readonly router = inject(Router);
    private readonly formBuilder = inject(NonNullableFormBuilder);
    private readonly messageService = inject(MessageService);

    registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        passwordFormGroup: this.formBuilder.group({
            password: ['', [Validators.required, 
                Validators.minLength(8),
                Validators.maxLength(15),
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).+$/)]],
            confirmPassword: ['', [Validators.required]]
        }, {validators: passwordMatchValidator("password", "confirmPassword")})
    })

    public get name() {
        return this.registerForm.controls.name;
    }

    public get email() {
        return this.registerForm.controls.email;
    }

    public get password() {
        return this.registerForm.controls.passwordFormGroup.controls.password
    }

    public get confirmPassword() {
        return this.registerForm.controls.passwordFormGroup.controls.confirmPassword;
    }

    public get passwordFormGroup() {
        return this.registerForm.controls.passwordFormGroup;
    }

    register() {
        this.registerForm.markAllAsTouched();

        if(this.registerForm.invalid) {
            console.log("Formulário inválido! Corrija os campos.");
            return;
        }

        const request: RegisterUserRequest = {
            name: this.name.getRawValue(),
            email: this.email.getRawValue(),
            password: this.password.getRawValue(),
        }

        this.userService.registerUser(request).subscribe({
            next: (response) => {
                console.log(response);
                this.router.navigate(["/"])
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao registrar usuário',
                    detail: error?.error?.message || 'Ocorreu um erro ao registrar o usuário. Por favor, tente novamente mais tarde.',
                    life: 3000
                })
            }
        })
    }

}