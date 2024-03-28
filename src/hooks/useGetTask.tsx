import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api";

export const useGetTask = (projectId: string, taskId: string) => {
    return useQuery({
        queryFn: () => getTaskById({ projectId, taskId }),
        queryKey: ['taskById', taskId],
        enabled: !!taskId
    });
}