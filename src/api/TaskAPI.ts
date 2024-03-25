import { uptaskApi } from '@/lib';
import { Task, TaskFormData } from "@/types";
import { makeSafeRequest } from '@/utils';

type TaskAPI = {
    projectId: string;
    formData: TaskFormData;
}

export const createTask = async ({ projectId, formData }: TaskAPI) => {
    return makeSafeRequest<Task>(() => uptaskApi.post(`/projects/${projectId}/tasks`, formData));
}