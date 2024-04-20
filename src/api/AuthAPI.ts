import { uptaskApi } from './../lib/axios';
import { makeSafeRequest } from './../utils/index';
import { ForgotPasswordForm, NewPasswordFormData, UserLoginForm, UserRegistrationForm } from "@/types";

export const createAccount = async (formData: UserRegistrationForm) => {
    return await makeSafeRequest<string>(() => uptaskApi.post('/auth/create-account', formData))
}

export const confirmAccount = async (token: string) => {
    return await makeSafeRequest<string>(() => uptaskApi.post('/auth/confirm-account', { token }))
}

export const requestCode = async (email: string) => {
    return await makeSafeRequest<string>(() => uptaskApi.post('/auth/request-code', { email }))
}

export const doLogin = async (data: UserLoginForm) => {
    return await makeSafeRequest<string>(() => uptaskApi.post('/auth/login', data))
}

export const forgotPassword = async (data: ForgotPasswordForm) => {
    return await makeSafeRequest<string>(() => uptaskApi.post('/auth/forgot-password', data))
}

export const validateToken = async (token: string) => {
    return await makeSafeRequest<string>(() => uptaskApi.post('/auth/validate-token', { token }))
}

export const updatePasswordWithToken = async ({ token, formData }: { token: string, formData: NewPasswordFormData }) => {
    return await makeSafeRequest<string>(() => uptaskApi.post(`/auth/update-password/${token}`, { ...formData }))
}