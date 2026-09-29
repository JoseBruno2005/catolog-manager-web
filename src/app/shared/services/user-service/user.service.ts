import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../core/environments/environment";
import { RegisterUserRequest, RegisterUserResponse } from "./type";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly httpClient = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    registerUser(request: RegisterUserRequest) {
        return this.httpClient.post<RegisterUserResponse>(
            `${this.apiUrl}/user/save`,
            request
        )
    }
}