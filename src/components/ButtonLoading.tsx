import { Loading } from "./Loading"

type ButtonLoadingProps = {
    title: string;
    isLoading: boolean;
    fullWidth?: boolean;
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({ title, isLoading = false, fullWidth = false }) => {
    return (
        <div className="flex flex-1 justify-center items-center">
            <div className={`${isLoading ? 'visible absolute' : 'hidden'}`}>
                <Loading />
            </div>
            <input
                disabled={isLoading}
                className={`${fullWidth ? 'w-full': ''} ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer'}  w-full p-3 text-white uppercase font-bold transition-colors rounded-md`}
                type="submit"
                value={`${isLoading ? '' : title}`}
            />
        </div>
    )
}
