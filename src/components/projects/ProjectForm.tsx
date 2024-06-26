import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "..";
import { ProjectFormData } from "types";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>,
    errors: FieldErrors<ProjectFormData>,
    disabledFields: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ register, errors, disabledFields = false }) => {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Project Name
                </label>
                <input
                    disabled={disabledFields}
                    id="projectName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Project Name"
                    {...register("projectName", {
                        required: "Name is required",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Client Name
                </label>
                <input
                    disabled={disabledFields}
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Client Name"
                    {...register("clientName", {
                        required: "Client Name is required",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Description
                </label>
                <textarea
                    disabled={disabledFields}
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Project Description"
                    {...register("description", {
                        required: "A description is required"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}