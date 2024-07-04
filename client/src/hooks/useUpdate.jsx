import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdate = () => {
    const queryClient = useQueryClient()

    const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch("/api/users/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "Unknown server error");
                }

                if (res.status === 200) {
                    const newPath = `/profile/${formData.username}`
                    window.history.replaceState(null, '', newPath)
                    return data
                }

            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            toast.success("Porfile updated");
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ["authUser"] }),
                queryClient.invalidateQueries({ queryKey: ["userProfile"] })
            ])
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    return { updateProfile, isUpdating }
}

export default useUpdate