import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"
import { Loading, ProjectForm } from "@/components"
import { ProjectFormData } from "@/types"
import { createProject } from "@/api";

const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
}

export const CreateProjectView = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate, isPending } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            navigate('/')
            toast.success(data?.msg)
        }
    })

    const onSubmit = async (formData: ProjectFormData) => mutate(formData);
    return (
        <>
            <h1 className="text-5xl font-black">Create Project</h1>
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
                            value={`${isPending ? '' : 'Create Project'}`}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
