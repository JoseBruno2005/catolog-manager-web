import { Component, input } from "@angular/core";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTypes, InputVariant } from "./types";
@Component({
    selector: 'app-input',
    imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule,
],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})
export class InputComponent {
    readonly type = input<InputTypes>('text');
    readonly placeholder = input<string | null>(null);
    readonly icon = input<string | null>(null);
    readonly variant = input<InputVariant>('filled');
}