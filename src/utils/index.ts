import { ApiResponse } from "@/types";
import { isAxiosError, AxiosResponse } from "axios";

export function isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
}

export const makeSafeRequest = async <T>(exec: () => Promise<AxiosResponse<ApiResponse<T>>>): Promise<ApiResponse<T>> => {
    try {
        const response = await exec();
        return response.data;
    } catch (error) {
        console.log(error);
        if (isAxiosError(error) && error.response) {
            if (isObject(error.response.data)) {
                throw new Error((error.response.data as ApiResponse<T>).msg);
            } else {
                throw new Error('An unexpected error happened, please try again later'); 
            }
        } else {
            throw new Error('An unexpected error happened, please try again later');
        }
    }
}

export const formateDate = (isoString: string): string => {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date);
}
