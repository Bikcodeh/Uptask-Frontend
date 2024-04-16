import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "@/types";
import { ButtonLoading, ErrorMessage } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api";
import { toast } from "react-toastify";

export const ForgotPasswordView: React.FC = () => {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleForgotPassword = (formData: ForgotPasswordForm) => { mutate(formData) }

    const {mutate, isPending} = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
            toast.success(data.msg)
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    return (
        <>
            <h1 className="text-5xl font-black mb-10 text-white">Forgot Password</h1>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10  bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail is not valid",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <ButtonLoading
                    title="Send Instructions"
                    isLoading={isPending}
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/login'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Already have an account? Login
                </Link>

                <Link
                    to='/auth/register'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Don't have an account? Sign Up
                </Link>
            </nav>
        </>
    )
}
