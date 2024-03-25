import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"
import { getProjectById } from '@/api'
import { EditProjectForm, Loading } from '@/components'

export const EditProjectView = () => {
    const { projectId = '' } = useParams();
    const { data, isFetching, isError } = useQuery({
        queryKey: ['projectById'],
        queryFn: () => getProjectById(projectId!)
    })

    if (isError) <Navigate to="/404" />
    if (isFetching) return <div className="flex flex-1 justify-center items-center"><Loading /></div>
    if (data?.data) return <EditProjectForm project={data.data} projectId={projectId} />
   
}
