import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layout";
import { CreateProjectView, DashboardView, EditProjectView, NotFoundView } from "@/views";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="*" element={<NotFoundView />} index />
                    <Route path="/projects/create" element={<CreateProjectView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}