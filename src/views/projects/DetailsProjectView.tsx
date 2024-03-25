import { AlertMessage, Loading, AddTaskModal } from "@/components";
import { useGetProject } from "@/hooks";
import { useNavigate, useParams } from "react-router-dom";

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
    return (
        <div className="flex flex-1 justify-center items-center">
            <AlertMessage message={message ? message : 'An error happened, please try again later'} isError />
        </div>
    );
};

export const DetailsProjectView: React.FC = () => {

    const navigate = useNavigate();
    const { projectId = '' } = useParams();
    const { isFetching, data, isError } = useGetProject(projectId);

    if (!data) return (<ErrorMessage />)

    const { data: project, success, msg } = data!;

    if (isError || !success) return <ErrorMessage message={msg} />
    if (isFetching) return <div className="flex flex-1 justify-center items-center"><Loading /></div>
    if (data) return (
        <>
            <h1 className="text-5xl font-black">{ }</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Manage your projects</p>
            <nav className="my-5 flex gap-3">
                <button
                    className="uppercase bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate('?newTask=true')}
                >
                    Add Task
                </button>
            </nav>

            <AddTaskModal />
        </>
    )
}
