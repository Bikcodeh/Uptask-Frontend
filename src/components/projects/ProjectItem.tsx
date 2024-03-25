import { Link } from "react-router-dom";
import { Project } from "@/types";
import { deleteProjectById } from "@/api";
import { OptionsMenu } from "./ProjectOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loading } from "..";
import { toast } from "react-toastify";

type ProjectItemProps = {
  project: Project;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: deleteProjectById,
    onSuccess: (data) => {
      toast.success(data.msg)
      queryClient.invalidateQueries({
        queryKey: ['projects']
      })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none z-50">
          <Loading />
        </div>
      )}
      <li key={project.projectId} className={`${isPending ? 'opacity-50 pointer-events-none' : ''} flex justify-between gap-x-6 px-5 py-10`}>
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto space-y-2">
            <Link
              to={`/projects/${project.projectId}`}
              className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
            >
              {project.projectName}
            </Link>
            <p className="text-sm text-gray-400">Client: {project.clientName}</p>
            <p className="text-sm text-gray-400">{project.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-6">
          <OptionsMenu projectId={project.projectId} onDelete={() => mutate(project.projectId)} />
        </div>
      </li>
    </div>
  );

}