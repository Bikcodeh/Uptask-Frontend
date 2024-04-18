/** Project */
export type Project = {
    projectId: string,
    projectName: string,
    clientName: string,
    description: string,
    tasks: Task[];
};

export type ProjectFormData = Pick<Project, 'clientName' | 'description' | 'projectName'>

/** Project */

/** Task */
const enum TaskStatus {
    PENDING = 'pending',
    ON_HOLD = 'onHold',
    IN_PROGRESS = 'inProgress',
    UNDER_REVIEW = 'underReview',
    COMPLETED = 'completed'
}

export type Task = {
    taskId: string;
    name: string;
    description: string;
    project: Project;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
}; 

export type TaskFormData = Pick<Task, 'name' | 'description'>

/** Task */

/** ApiResponse */
export type ApiResponse<T> = {
    data?: T;
    msg: string;
    errors?: ErrorApi[];
    success: boolean;
};

export type ErrorApi = {
    msg: string;
}
/** ApiResponse */

/** Auth */
export type Auth = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordFormData = Pick<Auth, 'password' | 'password_confirmation'>
/** Auth */