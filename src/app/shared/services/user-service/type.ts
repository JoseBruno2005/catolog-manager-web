export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterUserResponse {
    publicId: string;
    name: string;
}