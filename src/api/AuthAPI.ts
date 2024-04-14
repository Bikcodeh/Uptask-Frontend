import { uptaskApi } from './../lib/axios';
import { makeSafeRequest } from './../utils/index';
import { UserRegistrationForm } from "@/types";

export const createAccount = async (formData: UserRegistrationForm) => {
    return await makeSafeRequest<string>(() => uptaskApi.post('/auth/create-account', formData))
}