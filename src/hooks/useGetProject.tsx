import { useQuery } from "@tanstack/react-query"
import { getProjectById, } from "@/api"

export const useGetProject = (id: string) => {
    return useQuery({
        queryKey: ['projectById', id],
        queryFn: () => getProjectById({id}),
        retry: false
    })
}