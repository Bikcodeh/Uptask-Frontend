import { NewPasswordFormData } from "@/types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ButtonLoading, ErrorMessage } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
    token: string;
}


export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ token }) => {
    const navigate = useNavigate()
    const initialValues: NewPasswordFormData = {
        password: '',
        password_confirmation: '',
    }

    const { mutate, isPending } = useMutation({
        mutationFn: updatePasswordWithToken,
        onSuccess: (data) => {
            toast.success(data.msg);
            reset();
            navigate('/auth/login', { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleNewPassword = (formData: NewPasswordFormData) => mutate({ token, formData })

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: 'Password must be ah least 8 characters'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Confirm Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Confirm password is required",
                            validate: value => value === password || 'Password does not match'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <ButtonLoading
                    title="Reset Password"
                    isLoading={isPending}
                />
            </form>
        </>
    )
}
