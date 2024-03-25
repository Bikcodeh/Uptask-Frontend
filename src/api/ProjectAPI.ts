import { Project, ProjectFormData } from "@/types";
import { uptaskApi } from "@/lib";
import { makeSafeRequest } from "@/utils";

type ProjectDataAPI = {
    id: string;
    formData: ProjectFormData;
}

export async function createProject({ formData }: ProjectDataAPI) {
    return await makeSafeRequest<Project>(() => uptaskApi.post('/projects', formData));
}

export async function getProjects() {
    return await makeSafeRequest<Project[]>(() => uptaskApi('/projects'));
}

export async function getProjectById({ id }: ProjectDataAPI) {
    return await makeSafeRequest<Project>(() => uptaskApi(`/projects/${id}`));
}

export async function updateProject({ id, formData }: ProjectDataAPI) {
    return await makeSafeRequest<Project>(() => uptaskApi.put(`/projects/${id}`, formData));
}

export async function deleteProjectById({ id }: ProjectDataAPI) {
    return await makeSafeRequest<null>(() => uptaskApi.delete(`/projects/${id}`));
}