import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types";
import { ButtonLoading, ErrorMessage } from "@/components";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api";
import { toast } from "react-toastify";

export const RegisterView: React.FC = () => {

    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }


    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData)
    }

    const { mutate, isPending } = useMutation({
        mutationFn: createAccount,
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
            <h1 className="text-5xl font-black text-white">Create Account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Fill the form to {''}
                <span className=" text-fuchsia-500 font-bold"> create your account</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10"
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
                        placeholder="Register Email"
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

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Name</label>
                    <input
                        type="name"
                        placeholder="Register name"
                        className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Register password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: 'Password must have at least 8 characters'
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
                        placeholder="Repeat Register Password"
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
                    title="Sign Up"
                    isLoading={isPending}
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={'/auth/login'}
                    className="text-center text-gray-300 font-normal"
                >
                    Already have an account? Login
                </Link>
            </nav>
        </>
    )
}
