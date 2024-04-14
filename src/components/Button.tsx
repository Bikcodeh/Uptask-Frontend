import { Link } from "react-router-dom"

type ButtonProps = {
    title: string;
    route: string;
}

export const Button: React.FC<ButtonProps> = ({ title, route }) => {
    return (
        <Link to={route} className="bg-purple-400 text-center hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md">
            { title }
        </Link>
    )
}
