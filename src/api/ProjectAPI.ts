import { Project, ProjectFormData } from "@/types";
import { uptaskApi } from "@/lib";
import { makeSafeRequest } from "@/utils";

export async function createProject(formData: ProjectFormData) {
    return await makeSafeRequest<Project>(() => uptaskApi.post('/projects', formData));
}

export async function getProjects() {
    return await makeSafeRequest<Project[]>(() => uptaskApi('/projects'));
}

export async function getProjectById(id: string) {
    return await makeSafeRequest<Project>(() => uptaskApi(`/projects/${id}`));
}

type UpdateProjectData = {
    id: string;
    formData: ProjectFormData;
}
export async function updateProject({ id, formData }: UpdateProjectData) {
    return await makeSafeRequest<Project>(() => uptaskApi.put(`/projects/${id}`, formData));
}

export async function deleteProjectById(id: string) {
    return await makeSafeRequest<null>(() => uptaskApi.delete(`/projects/${id}`));
}