import { ProjectForm } from "@/components"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { ProjectFormData } from "types"

const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
}

export const CreateProjectView = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const onSubmit = (data: ProjectFormData) => {

    }

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

                    <ProjectForm register={register} errors={errors} />
                    <input
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md"
                        type="submit"
                        value="Create Project"
                    />

                </form>
            </div>
        </>
    )
}
