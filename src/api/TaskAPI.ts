import { uptaskApi } from '@/lib';
import { Task, TaskFormData } from "@/types";
import { makeSafeRequest } from '@/utils';

type TaskAPI = {
    projectId: string;
    formData: TaskFormData;
    taskId: string;
}

export const createTask = async ({ projectId, formData }: Pick<TaskAPI, 'projectId' | 'formData'>) => {
    return makeSafeRequest<Task>(() => uptaskApi.post(`/projects/${projectId}/tasks`, formData));
}

export const getTaskById = async ({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) => {
    return makeSafeRequest<Task>(() => uptaskApi(`/projects/${projectId}/tasks/${taskId}`));
}

export const updateTask = async ({ projectId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) => {
    return makeSafeRequest<Task>(() => uptaskApi.put(`/projects/${projectId}/tasks/${taskId}`, { ...formData }));
}