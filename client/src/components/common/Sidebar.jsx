import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
    const queryClient = useQueryClient()

    const { mutate: logoutMutation } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/logout", {
                    method: "POST"
                })

                const data = await res.json()
                if (res.status === 200) {
                    toast.success("Logged out successfully");
                    queryClient.invalidateQueries({ queryKey: ["authUser"] })
                } else {
                    throw new Error(data.error || "Unknown server error");
                }

            } catch (error) {
                toast.error(error.message)
            }
        }
    })

    const { data: authUser } = useQuery({ queryKey: ["authUser"] })

    return (
        <div className='md:flex-[2_2_0] w-18 max-w-52'>
            <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
                <NavLink to='/' className='flex justify-center md:justify-start'>
                    <img src="/logo.webp" alt="logo" style={{ width: "20%" }} />
                </NavLink>
                <ul className='flex flex-col gap-3 mt-4'>
                    <li className='flex justify-center md:justify-start'>
                        <NavLink to='/' className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'>
                            <MdHomeFilled className='w-8 h-8' />
                            <span className='text-lg hidden md:block'>Home</span>
                        </NavLink>
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <NavLink to='/notifications' className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'>
                            <IoNotifications className='w-6 h-6' />
                            <span className='text-lg hidden md:block'>Notifications</span>
                        </NavLink>
                    </li>

                    <li className='flex justify-center md:justify-start'>
                        <NavLink to={`/profile/${authUser?.username}`} className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'>
                            <FaUser className='w-6 h-6' />
                            <span className='text-lg hidden md:block'>Profile</span>
                        </NavLink>
                    </li>
                </ul>
                {authUser && (
                    <NavLink to={`/profile/${authUser?.username}`} className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'>
                        <div className='avatar hidden md:inline-flex'>
                            <div className='w-8 rounded-full'>
                                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
                            </div>
                        </div>
                        <div className='flex justify-between flex-1'>
                            <div className='hidden md:block'>
                                <p className='text-white font-bold text-sm w-20 truncate'>{authUser?.fullname}</p>
                                <p className='text-slate-500 text-sm'>@{authUser?.username}</p>
                            </div>
                            <BiLogOut className='w-5 h-5 cursor-pointer' title="logout" onClick={(e) => {
                                e.preventDefault()
                                logoutMutation()
                            }} />
                        </div>
                    </NavLink>
                )}
            </div>
        </div>
    );
};
export default Sidebar;