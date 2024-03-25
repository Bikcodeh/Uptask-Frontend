import { ApiResponse, Project, ProjectFormData } from "@/types";
import { uptaskApi } from "@/lib";
import { makeSafeRequest } from "@/utils";

export async function createProject(formData: ProjectFormData) {
    return await makeSafeRequest(() => uptaskApi.post<ApiResponse<Project>>('/projects', formData));
}

export async function getProjects() {
    return await makeSafeRequest(() => uptaskApi<ApiResponse<Project[]>>('/projects'));
}

export async function getProjectById(id: string) {
    return await makeSafeRequest(() => uptaskApi<ApiResponse<Project>>(`/projects/${id}`));
}

type UpdateProjectData = {
    id: string;
    formData: ProjectFormData;
}
export async function updateProject({ id, formData }: UpdateProjectData) {
    return await makeSafeRequest(() => uptaskApi.put<ApiResponse<Project>>(`/projects/${id}`, formData));
}

export async function deleteProjectById(id: string) {
    return await makeSafeRequest(() => uptaskApi.delete<ApiResponse<null>>(`/projects/${id}`));
}