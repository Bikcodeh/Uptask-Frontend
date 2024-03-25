import { uptaskApi } from '@/lib';
import { isAxiosError } from 'axios';
import { ApiResponse, Task, TaskFormData } from "@/types";

type TaskAPI = {
    projectId: string;
    formData: TaskFormData;
}

export const createTask = async ({ projectId, formData }: TaskAPI) => {
    try {
        const { data } = await uptaskApi.post<ApiResponse<Task>>(`/projects/${projectId}/tasks`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error((error.response.data as ApiResponse<Task>).msg);
        } else {
            throw new Error('An unexpected error happened, please try again later')
        }
    }
}