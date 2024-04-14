
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ButtonLoading, ErrorMessage } from "@/components";
import { RequestConfirmationCodeForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { requestCode } from "@/api";
import { toast } from "react-toastify";

export const RequestCodeView: React.FC = () => {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { mutate, isPending } = useMutation({
        mutationFn: requestCode,
        onSuccess: (data) => {
            toast.success(data.msg)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData.email)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Request a confirmation code</h1>
            <p className="text-2xl font-light text-white mt-5">
                Fill your email to get  {''}
                <span className=" text-fuchsia-500 font-bold"> a new code</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
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
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email is not valid",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <ButtonLoading
                    title="Send code"
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
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Forgot password? Recover
                </Link>
            </nav>
        </>
    )
}
