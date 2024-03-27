import { Task } from "@/types";
import { TaskOptions } from "./TaskOptions";

type TaskCardProps = {
  task: Task;
}
export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
      <div className="min-w-0 flex flex-col gap-y-4">
        <button type="button"
          className="text-xl font-bold text-slate-600 text-left"
        >
          {task.name}
          <p className="text-slate-500">{task.description}</p>
        </button>
      </div>
      <TaskOptions task={task}/>
    </li>
  )
}
