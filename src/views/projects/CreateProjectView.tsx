import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { Button, ButtonLoading, ProjectForm } from "@/components"
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
            console.log(error)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            navigate('/')
            toast.success(data?.msg)
        }
    })

    const onSubmit = async (formData: ProjectFormData) => mutate({ formData });
    return (
        <>
            <h1 className="text-5xl font-black">Create Project</h1>
            <nav className="my-5">
                <Button title="Back" route="/" />
            </nav>
            <div className="max-w-3xl mx-auto">
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <ProjectForm disabledFields={isPending} register={register} errors={errors} />
                    <ButtonLoading title="Create Project" isLoading={isPending} />
                </form>
            </div>
        </>
    )
}
