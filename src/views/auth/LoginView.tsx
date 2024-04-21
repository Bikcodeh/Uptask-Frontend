import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types";
import { ButtonLoading, ErrorMessage } from "@/components";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { doLogin } from "@/api";
import { toast } from "react-toastify";

export const LoginView: React.FC = () => {

    const { mutate, isPending } = useMutation({
        mutationFn: doLogin,
        onSuccess: (data) => {
            toast.success(data.msg)
            localStorage.setItem('AUTH_TOKEN', data.data || '')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black mb-10 text-white">Login</h1>
            <p className="text-2xl font-light text-white mt-5 mb-5">
               Start planning your projects {''}
                <span className=" text-fuchsia-500 font-bold"> loggin into the app</span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
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

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <ButtonLoading
                    title="Login"
                    isLoading={isPending}
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={'/auth/register'}
                    className="text-center text-gray-300 font-normal"
                >
                    Don't have an account? Sign up now
                </Link>
            </nav>
        </>
    )
}
