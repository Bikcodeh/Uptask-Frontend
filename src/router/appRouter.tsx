import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout, AuthLayout } from "@/layout";
import { 
    CreateProjectView,
    DetailsProjectView,
    DashboardView, 
    EditProjectView, 
    NotFoundView,
    LoginView,
    RegisterView,
    ConfirmAccountView,
    RequestCodeView
} from "@/views";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="*" element={<NotFoundView />} index />
                    <Route path="/projects/create" element={<CreateProjectView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                    <Route path="/projects/:projectId" element={<DetailsProjectView />} />
                </Route>
                <Route element={<AuthLayout />} >
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/request-code" element={<RequestCodeView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}