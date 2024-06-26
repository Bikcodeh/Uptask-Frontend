import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Fragment } from "react"
import { Task } from "@/types"
import { deleteTask } from "@/api"

type TaskOptionsProps = {
    task: Task;
}


export const TaskOptions: React.FC<TaskOptionsProps> = ({ task }) => {

    const navigate = useNavigate();
    const client = useQueryClient();
    const { projectId = '' } = useParams();

    const { mutate } = useMutation({
        mutationFn: deleteTask,
        mutationKey: ['deleteTask', task.taskId],
        onSuccess: (data) => {
            toast.success(data.msg)
            client.invalidateQueries({ queryKey: ['projectById', projectId] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return (
        <div className="flex shrink-0  gap-x-6">
            <Menu as="div" className="relative flex-none">
                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                </Menu.Button>
                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                            <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                onClick={() => navigate(`?viewTask=${task.taskId}`)}
                            >
                                Details
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                onClick={() => navigate(`?taskId=${task.taskId}`)}
                            >
                                Edit Task
                            </button>
                        </Menu.Item>

                        <Menu.Item>
                            <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                onClick={() => mutate({ taskId: task.taskId, projectId })}
                            >
                                Delete Task
                            </button>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
