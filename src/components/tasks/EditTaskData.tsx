import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getTaskById } from '@/api'
import { EditTaskModal } from "./EditTaskModal";

export const EditTaskData = () => {

  const location = useLocation();
  const { projectId = '' } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskId') || ''

  const { data, error, isFetching } = useQuery({
    queryFn: () => getTaskById({ projectId, taskId }),
    queryKey: ['taskById', taskId],
    enabled: !!taskId
  });

  if (error) return (<Navigate to={'/404'} />)

  if (data?.data) return (
    <EditTaskModal task={data.data} projectId={projectId}/>
  )
}
