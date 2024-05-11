import { Link, Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import { Loading, Logo, NavMenu } from "@/components"
import { useAuth } from "@/hooks"

export const AppLayout = () => {

    const { isFetching, isError, data } = useAuth();

    if (isFetching) return <Loading />
    if (isError) return <Navigate to="/auth/login" />
    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link to={'/'} replace>
                            <Logo />
                        </Link>
                    </div>
                    <NavMenu userName={data?.name || ''} />
                </div>
            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>
            <footer className="py-5">
                <p className="text-center">
                    All Rights Reserved - {new Date().getFullYear()}
                </p>
            </footer>
            <ToastContainer />
        </>
    )
}
