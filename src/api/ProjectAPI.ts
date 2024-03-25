
import { ApiResponse, Project, ProjectFormData } from "@/types";
import { uptaskApi } from "@/lib";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await uptaskApi.post<ApiResponse<Project>>('/projects', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error((error.response.data as ApiResponse<Project>).msg);
        } else {
            throw new Error('An unexpected error happened, please try again later')
        }
    }
}

export async function getProjects() {
    try {
        const { data } = await uptaskApi<ApiResponse<Project[]>>('/projects');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error((error.response.data as ApiResponse<Project>).msg);
        } else {
            throw new Error('An unexpected error happened, please try again later')
        }
    }
}

export async function getProjectById(id: string) {
    try {
        const { data } = await uptaskApi<ApiResponse<Project>>(`/projects/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error((error.response.data as ApiResponse<Project>).msg);
        } else {
            throw new Error('An unexpected error happened, please try again later')
        }
    }
}

type UpdateProjectData = {
    id: string;
    formData: ProjectFormData;
}
export async function updateProject({ id, formData }: UpdateProjectData) {
    try {
        const { data } = await uptaskApi.put<ApiResponse<Project>>(`/projects/${id}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error((error.response.data as ApiResponse<Project>).msg);
        } else {
            throw new Error('An unexpected error happened, please try again later')
        }
    }
}