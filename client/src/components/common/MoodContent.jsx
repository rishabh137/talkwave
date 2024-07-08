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
                    <h1 className="text-3xl text-center my-5 border-b border-gray-700 font-normal">Great to see you're feeling happy! Enjoy some jokes to keep the smiles going!</h1>
                }
                {
                    params.mood === "sad" &&
                    <h1 className="text-3xl text-center my-5 border-b border-gray-700 font-normal">If you're feeling down, here are some motivational contents to lift your spirits!</h1>
                }
                {
                    params.mood === "angry" &&
                    <h1 className="text-3xl text-center my-5 border-b border-gray-700 font-normal">Feeling angry? Here are some quotes to help bring peace and calm.</h1>
                }
                {
                    params.mood === "love" &&
                    <h1 className="text-3xl text-center my-5 border-b border-gray-700 font-normal">Indulge in some beautiful shayari about love that you might enjoy!</h1>
                }
                {(isLoading || isRefetching) && (
                    <>
                        <div className="flex justify-center items-center">
                            <LoadingSpinner />
                        </div>
                    </>
                )}
                {!isLoading && !isRefetching && (
                    <div>
                        {getMoodData?.map((data, index) => (
                            <div key={index} className="p-5 border-b border-gray-700">
                                {typeof data === 'string' ? (
                                    data.split('\n').map((line, lineIndex) => (
                                        <p key={lineIndex}>{line}</p>
                                    ))
                                ) : (
                                    <p>{data}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default MoodContent