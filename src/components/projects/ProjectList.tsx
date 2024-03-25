import { Project } from "@/types";
import { ProjectItem } from "./ProjectItem";

export const ProjectList = ({ projects }: { projects: Project[] }) => (
    <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
        {projects.map((project) => (
            <ProjectItem key={project.projectId} project={project} />
        ))}
    </ul>
);