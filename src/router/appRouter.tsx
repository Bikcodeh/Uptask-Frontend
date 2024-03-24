import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layout";
import { DashboardView } from "../views";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}