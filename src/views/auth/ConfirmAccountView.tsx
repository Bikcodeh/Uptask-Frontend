import { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api";
import { toast } from "react-toastify";

export const ConfirmAccountView: React.FC = () => {

    const [token, setToken] = useState('');

    const { mutate, isPending } = useMutation({
        mutationFn: confirmAccount,
        onSuccess: (data) => {
            toast.success(data.msg)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleOnChange = (token: string) => {
        setToken(token)
    }

    const handleOnComplete = (tokenComplete: string) => {
        mutate(tokenComplete)
    }



    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirm your account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter the code that we sent you {''}
                <span className=" text-fuchsia-500 font-bold"> by e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Code of 6 digits</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleOnChange} onComplete={handleOnComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>

            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/new-code'
                    className="text-center text-gray-300 font-normal"
                >
                    Get a new code
                </Link>
            </nav>

        </>
    )
}
