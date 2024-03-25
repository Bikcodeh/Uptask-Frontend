type AlertMessageProps = {
    message: string;
    isError: boolean;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ message, isError = false }) => {
    return (
        <div className={`${isError ? 'bg-red-400' : 'bg-green-500'} w-screen lg:w-3/6 text-white p-4 flex items-center rounded-lg`}>
            <p className="text-center text-2xl font-bold">{ message }</p>
        </div>
    )
}
