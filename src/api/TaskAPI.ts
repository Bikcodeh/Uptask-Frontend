import { uptaskApi } from '@/lib';
import { ApiResponse, Task, TaskFormData } from "@/types";
import { makeSafeRequest } from '@/utils';

type TaskAPI = {
    projectId: string;
    formData: TaskFormData;
}

export const createTask = async ({ projectId, formData }: TaskAPI) => {
    return makeSafeRequest(() => uptaskApi.post<ApiResponse<Task>>(`/projects/${projectId}/tasks`, formData));
}