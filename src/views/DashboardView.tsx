import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getProjects } from '@/api';
import { AlertMessage, Loading, ProjectList } from '@/components';

export const DashboardView = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const isLoading = isFetching || !data;
  const projects = data?.data || [];

  return (
    <>
      <h1 className="text-5xl font-black">My Projects</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Manage your projects</p>
      <nav className="my-5">
        <Link
          to="/projects/create"
          className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
        >
          New Project
        </Link>
      </nav>
      {error && (
        <div className="w-full flex justify-center items-center">
          <AlertMessage message="An error happened trying to load projects, please try again later" isError={true} />
        </div>
      )}
      {!error && isLoading && (
        <div className="w-full flex justify-center items-center">
          <Loading />
        </div>
      )}
      {!error && !isLoading && projects.length === 0 && (
        <p className="text-center py-20">
          No projects yet{' '}
          <Link to="/projects/create" className="text-fuchsia-500 font-bold">
            create project
          </Link>
        </p>
      )}
      {!error && !isLoading && projects.length > 0 && <ProjectList projects={projects} />}
    </>
  );
};

