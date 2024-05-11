import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/api"

export const useAuth = () => {
    const { isFetching, isError, data } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    })

    return {
        isError,
        isFetching,
        data: data?.data
    }
}