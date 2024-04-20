import { Link } from 'react-router-dom';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { validateToken } from '@/api';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsTokenValid: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewPasswordToken: React.FC<NewPasswordTokenProps> = ({ token, setToken, setIsTokenValid }) => {
    const { mutate } = useMutation({
        mutationFn: validateToken,
        onSuccess: (data) => {
            toast.success(data.msg)
            setIsTokenValid(true)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const handleChange = (token: string) => { setToken(token) }
    const handleComplete = (token: string) => mutate(token)

    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >6 digits code</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    Request a new code
                </Link>
            </nav>
        </>
    )
}
