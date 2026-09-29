import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(
    passwordControlName: string, confirmPasswordControlName: string
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordControl = control.get(passwordControlName);
        const confirmPasswordControl = control.get(confirmPasswordControlName);

        if (!passwordControl || !confirmPasswordControl) {
            return null;
        }

        return passwordControl.value === confirmPasswordControl.value ? null : { mismatch: true };
    };
}