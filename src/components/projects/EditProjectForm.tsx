import { useMutation } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { Loading } from ".."
import { ProjectForm } from "./ProjectForm"
import { Project, ProjectFormData } from "@/types"
import { updateProject } from "@/api"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

type EditProjectFormProps = {
    project: Project;
    projectId: string;
}

export const EditProjectForm: React.FC<EditProjectFormProps> = ({ project, projectId }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            projectName: project.projectName,
            clientName: project.clientName,
            description: project.description
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: updateProject,
        mutationKey: ['updateProject', projectId],
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data.msg);
        }
    })

    const onSubmit = (formData: ProjectFormData) => {
        mutate({ id: projectId, formData })
    }

    return (
        <>
            <h1 className="text-5xl font-black">Edit Project</h1>
            <nav className="my-5">
                <Link to='/' className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md">
                    Back
                </Link>
            </nav>
            <div className="max-w-3xl mx-auto">
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <ProjectForm disabledFields={isPending} register={register} errors={errors} />
                    <div className="flex justify-center items-center">
                        <div className={`${isPending ? 'visible absolute' : 'hidden'}`}>
                            <Loading />
                        </div>
                        <input
                            disabled={isPending}
                            className={`${isPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer'}  w-full p-3 text-white uppercase font-bold transition-colors rounded-md`}
                            type="submit"
                            value={`${isPending ? '' : 'Save Project'}`}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
