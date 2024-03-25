import { ApiResponse } from "@/types";
import { isAxiosError, AxiosResponse } from "axios";

export const makeSafeRequest = async <T>(exec: () => Promise<AxiosResponse<T>>): Promise<T> => {
    try {
        const response = await exec();
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error((error.response.data as ApiResponse<T>).msg);
        } else {
            throw new Error('An unexpected error happened, please try again later');
        }
    }
}
