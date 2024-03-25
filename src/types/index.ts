/** Project */
export type Project = {
    projectId: string,
    projectName: string,
    clientName: string,
    description: string,
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