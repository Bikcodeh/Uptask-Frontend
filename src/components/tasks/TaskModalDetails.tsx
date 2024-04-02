import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formateDate } from '@/utils';
import { useGetTask } from '@/hooks';
import { updateStatusTask } from '@/api';
import { toast } from 'react-toastify';
import { statusTranslations } from '@/locales';

export const TaskModalDetails: React.FC = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { projectId = '' } = useParams()
    const queryClient = useQueryClient()
    const params = new URLSearchParams(location.search)
    const taskId = params.get('viewTask') || ''

    const { mutate } = useMutation({
        mutationFn: updateStatusTask,
        onSuccess: (data) => {
            toast.success(data.msg)
            queryClient.invalidateQueries({queryKey: ['projectById', projectId]})
            queryClient.invalidateQueries({queryKey: ['taskById', taskId]})
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        mutate({ projectId, taskId, status: e.target.value });
    }

    if (!projectId) return (<Navigate to={'/'} />)

    const { data, isError, error } = useGetTask(projectId, taskId)
    if (!data?.data || isError) {
        toast.error(error?.message)
        return <Navigate to={`/projects/${projectId}`} replace />
    }

    const { data: task } = data;

    return (
        <>
            <Transition appear show={!!data?.data} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Added: {formateDate(task.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Last Update: {formateDate(task.updatedAt)}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{task.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Description: {task.description}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Current Status:</label>
                                        <select
                                            className='w-full p-3 bg-white border border-gray-300'
                                            name="status"
                                            id="status"
                                            defaultValue={task.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
