import { Project } from "@/types";
import { Link } from "react-router-dom";
import { OptionsMenu } from "./ProjectOptions";

export const ProjectItem = ({ project }: { project: Project}) => (
    <li key={project.projectId} className="flex justify-between gap-x-6 px-5 py-10">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <Link
            to={`/projects/${project.projectId}/edit`}
            className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
          >
            {project.projectName}
          </Link>
          <p className="text-sm text-gray-400">Client: {project.clientName}</p>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        <OptionsMenu />
      </div>
    </li>
  );