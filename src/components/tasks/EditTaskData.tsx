import { Navigate, useLocation, useParams } from "react-router-dom"
import { EditTaskModal } from "./EditTaskModal";
import { useGetTask } from "@/hooks";

export const EditTaskData = () => {

  const location = useLocation();
  const { projectId = '' } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskId') || ''

  const { data, error } = useGetTask(projectId, taskId)

  if (error) return (<Navigate to={'/404'} />)

  if (data?.data) return (
    <EditTaskModal task={data.data} projectId={projectId}/>
  )
}
