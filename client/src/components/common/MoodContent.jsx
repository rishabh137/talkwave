import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"
import { useEffect } from "react"


const MoodContent = () => {
    const params = useParams()

    const { data: getMoodData, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ["moodData", params.mood],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/mood/${params.mood}`)
                const data = await res.json()

                if (res.status === 200) {
                    return data
                } else {
                    throw new Error(data.error || "Unknown server error");
                }

            } catch (error) {
                throw new Error(error)
            }
        }
    })

    useEffect(() => {
        refetch()
    }, [params.mood, refetch])

    return (
        <>
            <div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
                {
                    params.mood === "happy" &&
                    <h1 className="text-2xl text-center my-5 border-b border-gray-700 font-normal">That's nice you are happy, Here is some jokes that might help you.</h1>
                }
                {
                    params.mood === "sad" &&
                    <h1 className="text-2xl text-center my-5 border-b border-gray-700 font-normal">Since you are sad, Here is some motivational contents to cheer you!</h1>
                }
                {(isLoading || isRefetching) && (
                    <>
                        <div className="flex justify-center items-center">
                            <LoadingSpinner />
                        </div>
                    </>
                )}
                {
                    !isLoading && !isRefetching &&
                    getMoodData?.map((data, ind) => (
                        <div key={ind} className="p-5 border-b border-gray-700">
                            <p>{data}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MoodContent