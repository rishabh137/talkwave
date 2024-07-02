import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useFollow = () => {
    const queryClient = useQueryClient()
    const { mutate: follow, isPending } = useMutation({
        mutationFn: async (userId) => {
            try {
                const res = await fetch(`/api/users/follow/${userId}`, {
                    method: "POST"
                })

                const data = await res.json()

                if (res.status === 200) {
                    Promise.all([
                        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
                        queryClient.invalidateQueries({ queryKey: ["authUser"] })
                    ])
                    return data
                } else {
                    throw new Error(data.error || "Unknown server error");
                }

            } catch (error) {
                toast.error(error.message)
            }
        }
    })
    return { follow, isPending }
}

export default useFollow